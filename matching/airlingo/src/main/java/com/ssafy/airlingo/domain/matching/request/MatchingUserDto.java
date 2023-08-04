package com.ssafy.airlingo.domain.matching.request;

import java.util.List;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Builder
@ToString
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "매칭 요청 유저 정보")
public class MatchingUserDto {

	@NotNull
	@Schema(description = "사용자 ID", example = "1", required = true)
	private Long userId;

	@NotBlank
	@Schema(description = "사용자 닉네임", example = "링고")
	private String userNickname;

	@NotBlank
	@Schema(description = "사용자 이미지", example = "http://User.s3.amazonaws.com/profile.png")
	private String userImgUrl;

	@NotBlank
	@Schema(description = "사용자 자기소개", example = "한국을 좋아해요.")
	private String userBio;

	@NotBlank
	@Schema(description = "사용자 모국어", example = "영어")
	private String userNativeLanguage;

	@NotNull
	@Schema(description = "사용자 학습어 ID", example = "1")
	private Long userStudyLanguageId;

	@NotBlank
	@Schema(description = "사용자 학습어", example = "한국어")
	private String userStudyLanguage;

	@NotBlank
	@Schema(description = "사용자 학습어 등급 이름", example = "B2")
	private String userStudyLanguageGradeName;

	@NotBlank
	@Schema(description = "사용자 학습어 등급 점수", example = "3")
	private int userStudyLanguageGradeScore;

	@NotNull
	@Schema(description = "사용자 관심언어", example = "한국어")
	private List<String> userInterestLanguages;

	@NotBlank
	@Schema(description = "사용자 별점", example = "4.3")
	private double userRating;

	@NotNull
	@Schema(description = "프리미엄 매칭 여부", example = "false")
	private boolean premium;

	@NotNull
	@Schema(description = "누적 마일리지", example = "10000")
	private int userTotalMileage;
	public boolean isMatchLanguage(MatchingUserDto matchingUserDto) {
		return this.userStudyLanguage.equals(matchingUserDto.getUserNativeLanguage())
			&& this.userNativeLanguage.equals(matchingUserDto.getUserStudyLanguage());
	}

	public boolean isPossiblePremiumUser(int premiumGradeScore, int premiumUserRating) {
		return this.userStudyLanguageGradeScore >= premiumGradeScore && this.userRating >= premiumUserRating;
	}
}
