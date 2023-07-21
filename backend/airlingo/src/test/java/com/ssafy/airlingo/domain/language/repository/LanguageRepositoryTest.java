package com.ssafy.airlingo.domain.language.repository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.ssafy.airlingo.domain.language.entity.Language;


@SpringBootTest
class LanguageRepositoryTest {

    @Autowired
    LanguageRepository languageRepository;

    @Test
    public void insert() {
        Language kor = new Language("한국어");
        Language eng = new Language("영어");

        languageRepository.save(kor);
        languageRepository.save(eng);
    }
}