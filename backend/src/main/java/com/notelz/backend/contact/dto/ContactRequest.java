package com.notelz.backend.contact.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ContactRequest(
        @NotBlank String name,
        @NotBlank @Email String email,
        @NotBlank @Size(max = 4000) String message
) {}
