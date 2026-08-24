package com.notelz.backend.contact.repository;

import com.notelz.backend.contact.model.ContactMessage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactMessageRepository extends JpaRepository<ContactMessage, Long> {
}
