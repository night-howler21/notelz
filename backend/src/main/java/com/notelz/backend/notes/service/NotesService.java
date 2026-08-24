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

        return new TopicDetail(
                topic.getId(),
                topic.getTitle(),
                topic.getContent(),
                topic.getSubject().getId(),
                topic.getSubject().getName()
        );
    }

    private SubjectSummary toSummary(Subject subject) {
        List<TopicSummary> topics = subject.getTopics().stream()
                .map(t -> new TopicSummary(t.getId(), t.getTitle(), t.getPreviewSnippet()))
                .toList();
        return new SubjectSummary(subject.getId(), subject.getName(), subject.getColorHex(), topics);
    }
}
