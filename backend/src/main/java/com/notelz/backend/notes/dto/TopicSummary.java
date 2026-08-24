package com.notelz.backend.notes.dto;

import java.util.List;

public record TopicSummary(
        Long id,
        String title,
        String previewSnippet,
        List<TopicSummary> subtopics
) {}
