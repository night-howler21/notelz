package com.notelz.backend.notes.service;

import com.notelz.backend.notes.dto.SubjectSummary;
import com.notelz.backend.notes.dto.TopicDetail;
import com.notelz.backend.notes.dto.TopicSummary;
import com.notelz.backend.notes.model.Subject;
import com.notelz.backend.notes.model.Topic;
import com.notelz.backend.notes.repository.SubjectRepository;
import com.notelz.backend.notes.repository.TopicRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NotesService {

    private final SubjectRepository subjectRepository;
    private final TopicRepository topicRepository;

    @Transactional(readOnly = true)
    public List<SubjectSummary> listSubjects() {
        return subjectRepository.findAll().stream()
                .sorted(Comparator.comparing(Subject::getSortOrder))
                .map(this::toSummary)
                .toList();
    }

    @Transactional(readOnly = true)
    public TopicDetail getTopic(Long id) {
        Topic topic = topicRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Topic not found"));

        List<TopicSummary> related = topic.getRelatedTopicIds().stream()
                .map(topicRepository::findById)
                .filter(Optional::isPresent)
                .map(Optional::get)
                .map(t -> new TopicSummary(t.getId(), t.getTitle(), t.getPreviewSnippet(), List.of()))
                .toList();

        return new TopicDetail(
                topic.getId(),
                topic.getTitle(),
                topic.getContent(),
                topic.getSubject().getId(),
                topic.getSubject().getName(),
                related
        );
    }

    private SubjectSummary toSummary(Subject subject) {
        List<Topic> all = subject.getTopics();

        Map<Long, List<Topic>> childrenByParentId = all.stream()
                .filter(t -> t.getParentTopic() != null)
                .collect(Collectors.groupingBy(t -> t.getParentTopic().getId()));

        List<TopicSummary> topics = all.stream()
                .filter(t -> t.getParentTopic() == null)
                .sorted(Comparator.comparing(Topic::getSortOrder))
                .map(t -> toTopicSummary(t, childrenByParentId))
                .toList();

        return new SubjectSummary(subject.getId(), subject.getName(), subject.getColorHex(), topics);
    }

    private TopicSummary toTopicSummary(Topic topic, Map<Long, List<Topic>> childrenByParentId) {
        List<TopicSummary> subtopics = childrenByParentId.getOrDefault(topic.getId(), List.of()).stream()
                .sorted(Comparator.comparing(Topic::getSortOrder))
                .map(child -> toTopicSummary(child, childrenByParentId))
                .toList();

        return new TopicSummary(topic.getId(), topic.getTitle(), topic.getPreviewSnippet(), subtopics);
    }
}
