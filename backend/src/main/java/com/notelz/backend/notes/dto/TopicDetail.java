package com.notelz.backend.notes.dto;

public record TopicDetail(
        Long id,
        String title,
        String content,
        Long subjectId,
        String subjectName
) {}
