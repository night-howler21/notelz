package com.notelz.backend.notes.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "topics")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Topic {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subject_id", nullable = false)
    private Subject subject;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_topic_id")
    private Topic parentTopic;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private Integer sortOrder;

    @Column(nullable = false, length = 500)
    private String previewSnippet;

    @Lob
    @Column(nullable = false)
    private String content;

    @ElementCollection
    @CollectionTable(name = "topic_related_ids", joinColumns = @JoinColumn(name = "topic_id"))
    @Column(name = "related_topic_id")
    @Builder.Default
    private List<Long> relatedTopicIds = new ArrayList<>();
}
