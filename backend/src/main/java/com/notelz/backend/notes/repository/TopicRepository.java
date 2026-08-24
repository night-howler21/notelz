package com.notelz.backend.notes.repository;

import com.notelz.backend.notes.model.Topic;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TopicRepository extends JpaRepository<Topic, Long> {
}
