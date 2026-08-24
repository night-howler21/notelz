package com.notelz.backend.notes.repository;

import com.notelz.backend.notes.model.Subject;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubjectRepository extends JpaRepository<Subject, Long> {
}
