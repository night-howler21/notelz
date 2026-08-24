package com.notelz.backend.notes.dto;

import java.util.List;

public record SubjectSummary(
        Long id,
        String name,
        String colorHex,
        List<TopicSummary> topics
) {}
