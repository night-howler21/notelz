package com.notelz.backend.notes.controller;

import com.notelz.backend.notes.dto.SubjectSummary;
import com.notelz.backend.notes.dto.TopicDetail;
import com.notelz.backend.notes.service.NotesService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/notes")
@RequiredArgsConstructor
public class NotesController {

    private final NotesService notesService;

    @GetMapping("/subjects")
    public List<SubjectSummary> listSubjects() {
        return notesService.listSubjects();
    }

    @GetMapping("/topics/{id}")
    public TopicDetail getTopic(@PathVariable Long id) {
        return notesService.getTopic(id);
    }
}
