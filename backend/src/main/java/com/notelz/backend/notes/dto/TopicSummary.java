package com.notelz.backend.notes.dto;

public record TopicSummary(
        Long id,
        String title,
        String previewSnippet
) {}
