package com.notelz.backend.notes.dto;

import java.util.List;

public record TopicDetail(
        Long id,
        String title,
        String content,
        Long subjectId,
        String subjectName,
        List<TopicSummary> relatedTopics
) {}
