import styled from "@emotion/styled";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "@/components/common/dropdown";
import { IconButton, TextButton } from "@/components/common/button";
import { TextInput } from "@/components/common/input";
import Tooltip from "@/components/common/tooltip/Tooltip";
import theme from "@/assets/styles/Theme";
import Modal from "@/components/modal";
import ValidationItem from "@/components/validationList";
import LanguageRankBox from "@/assets/imgs/language-rank-box.png";
import rightPassportPages from "@/assets/imgs/profiles/right-passport-pages.png";
import { ReactComponent as ModifyIcon } from "@/assets/icons/modify-icon.svg";
import { ReactComponent as KeyIcon } from "@/assets/icons/key-icon.svg";
import { ReactComponent as AlertIcon } from "@/assets/icons/alert-icon.svg";
import { ReactComponent as HeartIcon } from "@/assets/icons/heart-icon.svg";
import { ReactComponent as KoreaFlagIcon } from "@/assets/icons/flag-korea-icon.svg";
import { ReactComponent as BritainFlagIcon } from "@/assets/icons/flag-britain-icon.svg";
import { ReactComponent as JapanFlagIcon } from "@/assets/icons/flag-japan-icon.svg";
import { ReactComponent as ChinaFlagIcon } from "@/assets/icons/flag-china-icon.svg";
import { logoutUser, selectUser } from "@/features/User/UserSlice";
import { deleteUser, updateUserPassword } from "@/api/user.js";
import { useRouter } from "@/hooks";

const { primary1 } = theme.colors;

function checkPassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    return passwordRegex.test(password);
}

function checkConfirmPassword(password, confirmPassword) {
    return password === confirmPassword;
}

function BasicInfoPage2() {
    const dispatch = useDispatch();
    const { routeTo } = useRouter();
    const storeUser = useSelector(selectUser);
    const { userId } = storeUser;
    const [password, setPassword] = useState({ value: "", valid: false, dirty: false });
    const [confirmPassword, setConfirmPassword] = useState({
        value: "",
        valid: false,
        dirty: false,
    });
    const [passwordModalOpen, setPasswordModalOpen] = useState(false);
    const [quitModalOpen, setQuitModalOpen] = useState(false);

    // password modal
    const handlePasswordModalOpen = () => {
        setPasswordModalOpen(true);
    };

    const handlePasswordChange = (event) => {
        const newPassword = event.target.value.trim();
        setPassword((prev) => ({
            ...prev,
            value: newPassword,
            valid: checkPassword(newPassword),
            dirty: true,
        }));
        setConfirmPassword((prev) => ({
            ...prev,
            valid: checkConfirmPassword(newPassword, confirmPassword.value),
        }));
    };

    const handleConfirmPasswordChange = (event) => {
        const newConfirmPassword = event.target.value.trim();
        setConfirmPassword((prev) => ({
            ...prev,
            value: newConfirmPassword,
            valid: checkConfirmPassword(password.value, newConfirmPassword),
            dirty: true,
        }));
    };

    const handlePasswordSubmit = async () => {
        await updateUserPassword({
            responseFunc: {
                200: () => {
                    console.log("수정 성공!");
                    setPasswordModalOpen(false);
                    setPassword({ value: "", valid: false, dirty: false });
                    setConfirmPassword({ value: "", valid: false, dirty: false });
                },
                400: () => {
                    console.log("수정 실패!");
                },
            },
            data: { userPassword: password.value, userId },
        });
    };

    // quit modal
    const handleQuitModalOpen = () => {
        setQuitModalOpen(true);
    };

    const handleDeleteUser = async () => {
        await deleteUser({
            responseFunc: {
                200: () => {
                    dispatch(logoutUser());
                    setQuitModalOpen(false);
                    console.log("회원 탈퇴 성공!");
                    routeTo("/");
                },
                400: () => {
                    console.log("회원 탈퇴 실패!");
                },
            },
            data: { userId },
        });
    };

    // language modal
    const [languageModalOpen, setLanguageModalOpen] = useState(false);
    const handleLanguageModalOpen = () => {
        setLanguageModalOpen(true);
    };

    const [totalLanguage, setTotalLanguage] = useState([
        { id: "135", label: "한국어", img: KoreaFlagIcon },
        { id: "136", label: "영어", img: BritainFlagIcon },
        { id: "137", label: "일본어", img: JapanFlagIcon },
        { id: "138", label: "중국어", img: ChinaFlagIcon },
    ]);

    const level = [
        { id: "135", label: "A1", img: KoreaFlagIcon },
        { id: "136", label: "A2", img: JapanFlagIcon },
        { id: "137", label: "B1", img: JapanFlagIcon },
        { id: "138", label: "B2", img: JapanFlagIcon },
        { id: "139", label: "C1", img: JapanFlagIcon },
        { id: "140", label: "C2", img: JapanFlagIcon },
    ];

    const [studyLanguage, setStudyLanguage] = useState([]);
    const [selectedLevel, setSelectedLevel] = useState([]);
    const [languageList, setLanguageList] = useState([]);

    const handleClickLanguage = () => {
        if (studyLanguage.label && selectedLevel.label) {
            setLanguageList((prev) => [
                ...prev,
                {
                    id: studyLanguage.id,
                    img: studyLanguage.img,
                    title: studyLanguage.label,
                    level: selectedLevel.label,
                },
            ]);

            // 필터링하여 선택된 관심언어를 드롭다운에서 제거
            setTotalLanguage((prev) =>
                prev.filter((language) => language.label !== studyLanguage.label),
            );

            // 기존 상태 삭제
            setSelectedLevel({});
            setStudyLanguage({});
        }
    };

    const handleDeleteLanguage = (index) => {
        const { id, title, img } = languageList.find((_, i) => i === index);
        setTotalLanguage((prev) => [...prev, { id, label: title, img }]);
        setLanguageList((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        // <BasicInfoPageContainer>
        <RightPageBox>
            <LeftPassportPages src={rightPassportPages} />
            <RightPassportPage>
                {passwordModalOpen && (
                    <Modal title="비밀번호 변경" modalOpen={passwordModalOpen} Icon={KeyIcon}>
                        <TextInput
                            type="password"
                            placeholder="비밀번호"
                            width="500px"
                            value={password.value}
                            onChange={handlePasswordChange}
                            color={primary1}
                        />
                        <TextInput
                            type="password"
                            placeholder="비밀번호 확인"
                            width="500px"
                            value={confirmPassword.value}
                            onChange={handleConfirmPasswordChange}
                            color={primary1}
                        />
                        <ValidationList>
                            <ValidationItem
                                isValid={password.valid}
                                isDirty={password.dirty}
                                text="비밀번호는 8 ~ 20자의 영어 대 · 소문자, 숫자, 특수문자의 조합입니다."
                            />
                            <ValidationItem
                                isValid={confirmPassword.valid}
                                isDirty={confirmPassword.dirty}
                                text="비밀번호와 비밀번호 확인은 동일해야 합니다."
                            />
                        </ValidationList>
                        <ModalButtonBox>
                            <TextButton
                                shape="positive-curved"
                                text="확인"
                                onClick={() => handlePasswordSubmit()}
                            />
                            <TextButton
                                shape="positive-curved"
                                text="취소"
                                onClick={() => setPasswordModalOpen(false)}
                            />
                        </ModalButtonBox>
                    </Modal>
                )}
                {languageModalOpen && (
                    <Modal title="관심언어 추가" modalOpen={languageModalOpen} Icon={HeartIcon}>
                        <SignupLanguageBox>
                            <StyledSelectContainer>
                                <StyledSelectLanguage>
                                    <Dropdown
                                        width="180px"
                                        shape="negative"
                                        data={totalLanguage}
                                        placeholder="관심 언어 설정"
                                        selectedOption={studyLanguage}
                                        onChange={setStudyLanguage}
                                    />
                                </StyledSelectLanguage>
                                <StyledSelectLevel>
                                    <Dropdown
                                        width="160px"
                                        shape="negative"
                                        data={level}
                                        placeholder="숙련도 설정"
                                        selectedOption={selectedLevel}
                                        onChange={setSelectedLevel}
                                    />
                                </StyledSelectLevel>
                                <TooltipBox>
                                    <Tooltip
                                        position={{
                                            horizontal: "right",
                                            vertical: "bottom",
                                            direction: "down",
                                        }}
                                    >
                                        <TooltipContentContainer />
                                    </Tooltip>
                                </TooltipBox>
                                <TextButton text="추가하기" onClick={handleClickLanguage} />
                            </StyledSelectContainer>
                        </SignupLanguageBox>
                        {languageList.length > 0 && (
                            <SelectedLanguagesContainer>
                                {languageList.map((language) => (
                                    <SelectedLanguage key={language.id}>
                                        <SelectedLanguageLabel>
                                            <language.img />
                                            <span>{language.title}</span>
                                            <span>{language.level}</span>
                                            <DeleteButton
                                                onClick={() => handleDeleteLanguage(language.id)}
                                            >
                                                X
                                            </DeleteButton>
                                        </SelectedLanguageLabel>
                                    </SelectedLanguage>
                                ))}
                            </SelectedLanguagesContainer>
                        )}
                        <ModalButtonBox>
                            <TextButton
                                shape="positive-curved"
                                text="확인"
                                onClick={() => setLanguageModalOpen(false)}
                            />
                            <TextButton
                                shape="positive-curved"
                                text="취소"
                                onClick={() => setLanguageModalOpen(false)}
                            />
                        </ModalButtonBox>
                    </Modal>
                )}
                {quitModalOpen && (
                    <Modal
                        title="회원 탈퇴"
                        modalOpen={quitModalOpen}
                        Icon={AlertIcon}
                        iconColor="red"
                        titleColor="red"
                    >
                        <ModalDescriptionTextBox>
                            <DescriptionTextWrapper>
                                정말 회원 탈퇴를 진행하시겠습니까?
                            </DescriptionTextWrapper>
                            <WaitingTimeTextWrapper>
                                계정이 삭제되며, 이 작업은 되돌릴 수 없습니다!
                            </WaitingTimeTextWrapper>
                        </ModalDescriptionTextBox>
                        <ModalButtonBox>
                            <TextButton
                                shape="warning-curved"
                                text="회원 탈퇴"
                                onClick={() => handleDeleteUser()}
                            />
                            <TextButton
                                shape="positive-curved"
                                text="취소"
                                onClick={() => setQuitModalOpen(false)}
                            />
                        </ModalButtonBox>
                    </Modal>
                )}
                <LanguageContainer>
                    <TitleContainer>
                        <TitleBox>
                            <TitleWrapper>관심 언어</TitleWrapper>
                            <SubTitleWrapper>LANGUAGE WANTING TO LEARN</SubTitleWrapper>
                        </TitleBox>
                        <TooltipBox>
                            <Tooltip
                                position={{
                                    horizontal: "right",
                                    vertical: "bottom",
                                    direction: "down",
                                }}
                            >
                                <TooltipContentContainer />
                            </Tooltip>
                        </TooltipBox>
                        <IconButton
                            shape="blacklinedlight"
                            icon={ModifyIcon}
                            onClick={handleLanguageModalOpen}
                        />
                    </TitleContainer>
                    <LanguageContentBox>
                        <LanguageBox>
                            <LanguageFlag
                                src="https://airlingobucket.s3.ap-northeast-2.amazonaws.com/flag-korea-icon.svg"
                                alt="Korean Flag"
                            />
                            <LanguageNameRankBox>
                                <LanguageName>한국어</LanguageName>
                                <LanguageRankContainer>
                                    <LanguageRank>상급</LanguageRank>
                                    <LanguageGrade>(C1)</LanguageGrade>
                                </LanguageRankContainer>
                            </LanguageNameRankBox>
                        </LanguageBox>
                        <LanguageBox>
                            <LanguageFlag
                                src="https://airlingobucket.s3.ap-northeast-2.amazonaws.com/flag-japan-icon.svg"
                                alt="Japanese Flag"
                            />
                            <LanguageNameRankBox>
                                <LanguageName>일본어</LanguageName>
                                <LanguageRankContainer>
                                    <LanguageRank>상급</LanguageRank>
                                    <LanguageGrade>(C1)</LanguageGrade>
                                </LanguageRankContainer>
                            </LanguageNameRankBox>
                        </LanguageBox>
                    </LanguageContentBox>
                    <ButtonBar>
                        <TextButton
                            text="비밀번호 변경"
                            width="160px"
                            shape="negative-normal"
                            onClick={handlePasswordModalOpen}
                        />
                        <TextButton
                            text="회원탈퇴"
                            width="120px"
                            shape="warning-quit"
                            onClick={handleQuitModalOpen}
                        />
                    </ButtonBar>
                </LanguageContainer>
            </RightPassportPage>
        </RightPageBox>
        // </BasicInfoPageContainer>
    );
}

// const BasicInfoPageContainer = styled.div`
//     position: relative;
//     width: 100%;
//     height: 100%;
// `;

const RightPageBox = styled.div`
    width: 507px;
    height: 705px;
`;

const LeftPassportPages = styled.img`
    margin-top: 55px;
    margin-left: 5px;
    position: absolute;
    z-index: -1;
`;

const RightPassportPage = styled.div`
    width: 500px;
    height: 700px;
    border-radius: 0px 20px 20px 0px;
    border: 1px solid #000;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 50px;
`;

const ValidationList = styled.div`
    display: flex;
    flex-direction: column;
    width: 500px;
    margin-top: 25px;
`;

// const ModalValidationContainer = styled.div`
//     display: flex;
//     width: 650px;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;
//     gap: 24px;
// `;

// const ModalValidationBox = styled.div`
//     display: flex;
//     height: 60px;
//     flex-direction: column;
//     justify-content: space-between;
//     align-items: flex-start;
// `;

const ModalButtonBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 50px;
`;

const ModalDescriptionTextBox = styled.div`
    display: flex;
    width: 600px;
    height: 40px;
    flex-direction: column;
    justify-content: center;
    color: #000;
    text-align: center;
    font-size: 25px;
    padding: 20px 0px;
`;

// 언어 모달
const SignupLanguageBox = styled.div`
    width: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    position: relative; /* position: relative 추가 */
    z-index: 1;
`;

const StyledSelectContainer = styled.div`
    display: flex;
    width: 500px;
    height: 68px;
    flex-shrink: 0;
    position: relative;
    z-index: 2;
    align-items: center;
`;

const StyledSelectLanguage = styled.div`
    color: rgba(0, 0, 0, 0.5);
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 300;
    line-height: 44px;
    display: flex;
    width: 180px;
    height: 50px;
    padding: 10px 0px;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
`;

const StyledSelectLevel = styled.div`
    color: rgba(0, 0, 0, 0.5);
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 300;
    line-height: 44px;
    flex: 1;
    display: flex;
    width: 160px;
    height: 50px;
    padding: 5px 10px;
    justify-content: space-between;
    align-items: center;
`;

const SelectedLanguagesContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    display: flex;
`;

const SelectedLanguage = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: Pretendard;
    font-size: 16px;
`;

const SelectedLanguageLabel = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 30px;
    background: #efefef;
    color: #000;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    vertical-align: middle;
    text-align: center;
    width: 465px;
    height: 45px;
    padding: 10px 20px;

    .language-img {
        width: 24px;
        height: 24px;
        margin-right: 10px;
    }

    .language-title {
        flex: 1;
    }

    .language-level {
        margin-right: 10px;
    }
`;

const DeleteButton = styled.button`
    background: transparent;
    border: none;
    color: red;
    cursor: pointer;
    font-size: 24px;
`;

// 회원 탈퇴 모달
const DescriptionTextWrapper = styled.div`
    font-weight: 400;
    line-height: 44px;
`;

const WaitingTimeTextWrapper = styled.div`
    font-size: 25px;
    font-weight: 700;
`;

// 여권 오른쪽
const LanguageContainer = styled.div`
    display: inline-flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 25px;
`;

const TitleContainer = styled.div`
    display: flex;
    width: 450px;
    justify-content: space-between;
    align-items: center;
`;

const TitleBox = styled.div`
    display: flex;
`;

const TitleWrapper = styled.div`
    color: #000;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;

const SubTitleWrapper = styled.div`
    color: #000;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    display: flex;
    align-items: flex-end;
    padding-left: 5px;
`;

const TooltipContentContainer = styled.div`
    position: relative;
    z-index: 999;
    width: 400px;
    height: 400px;
    background-image: url(${LanguageRankBox});
    background-size: cover;
    border-radius: 20px;
    background-color: transparent;
    border: 0.5px solid rgba(0, 0, 0, 0.2);
`;

const TooltipBox = styled.div`
    position: relative;
    z-index: 0;
    width: 30px;
    height: 24px;
`;

const LanguageContentBox = styled.div`
    display: flex;
    width: 450px;
    height: 500px;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    gap: 5px;
    border-radius: 10px;
    border: 1px solid #000;
    justify-content: space-between;
    padding: 10px;
`;

const LanguageBox = styled.div`
    display: flex;
    align-items: center;
    padding: 10px;
`;

const LanguageFlag = styled.img`
    width: 100px;
    height: 100px;
    margin-right: 10px;
`;

const LanguageNameRankBox = styled.div`
    flex-direction: column;
`;

const LanguageName = styled.div`
    color: #000;
    font-family: Pretendard;
    font-size: 25px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    padding-bottom: 10px;
`;

const LanguageRankContainer = styled.div`
    display: flex;
    color: var(--rainbow-blue, #35b1c9);
    width: 90px;
`;

const LanguageRank = styled.div`
    font-size: 20px;
    font-weight: 700;
`;

const LanguageGrade = styled.div`
    font-size: 15px;
    font-weight: 400;
    display: flex;
    align-items: flex-end;
`;

const ButtonBar = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 16px;
`;

export default BasicInfoPage2;
