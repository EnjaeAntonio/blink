import React, { useEffect, useState, useRef } from 'react';
import ProfileImagePlaceholder from '../../assets/images/profile-image-1.png';
import copy from './ChildCareEditProfile.json';

import { useLocation } from 'react-router';

import { useApp } from '../../context/AppContext';
import RadioButton from '../RadioButton/RadioButton';
import InputField from '../InputField/InputField';
import TextArea from '../TextArea/TextArea';
import { UserType } from '../../models/User';
import ButtonLight from '../ButtonLight/ButtonLight';
import { getUser } from '../../context/AppContext';
import ValidationUtils from '../../utils/ValidationUtils';
import StringUtils from '../../utils/StringUtils';
import ManagedCheckbox from '../ManagedCheckbox/ManagedCheckbox';
import ButtonDark from '../ButtonDark/ButtonDark';

function ChildCareEditProfile(props) {
    const location = useLocation();
    const [provider, setProvider] = useState();
    const [isAuthenticatedCustomer, setIsAuthenticatedCustomer] = useState(false);
    const { authenticatedCustomer, appLanguage, updateUser } = useApp();
    const moreDialogRef = useRef(null);
    const [moreDialog, setMoreDialog] = useState(Boolean);
    const [showBackdrop, setShowBackdrop] = useState(true);

    const handleOpenMoreDialog = () => {
        setMoreDialog(true);
        setShowBackdrop(true);
    };

    const handleCloseMoreDialog = () => {
        setMoreDialog(false);
    };

    const closeMoreDialog = () => {
        setMoreDialog(false);
        setShowBackdrop(false);
    };

    const [isFirstNameEditable, setIsFirstNameEditable] = useState(false);
    const [isLastNameEditable, setIsLastNameEditable] = useState(false);
    const [isAddressEditable, setIsAddressEditable] = useState(false);
    const [isPostalCodeEditable, setIsPostalCodeEditable] = useState(false);
    const [isCityEditable, setIsCityEditable] = useState(false);
    const [isProvinceEditable, setIsProvinceEditable] = useState(false);
    const [isEmailEditable, setIsEmailEditable] = useState(false);
    const [isPhoneEditable, setIsPhoneEditable] = useState(false);
    const [isDescriptionEditable, setIsDescriptionEditable] = useState(false);
    const [isFirstNameValid, setIsFirstNameValid] = useState(false);
    const [isLastNameValid, setIsLastNameValid] = useState(false);
    const [isAddressValid, setIsAddressValid] = useState(false);
    const [isPostalCodeValid, setIsPostalCodeValid] = useState(false);
    const [isCityValid, setIsCityValid] = useState(false);
    const [isProvinceValid, setIsProvinceValid] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isPhoneValid, setIsPhoneValid] = useState(false);
    const [isDescriptionValid, setIsDescriptionValid] = useState(false);
    const [isHourlyRateValid, setIsHourlyRateValid] = useState(false);
    const [isWorkExperienceValid, setIsWorkExperienceValid] = useState(false);

    const [firstNameError, setFirstNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    const [addressError, setAddressError] = useState(false);
    const [postalCodeError, setPostalCodeError] = useState(false);
    const [cityError, setCityError] = useState(false);
    const [provinceError, setProvinceError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);
    const [hourlyRateError, setHourlyRateError] = useState(false);
    const [workExperienceError, setWorkExperienceError] = useState(false);

    const [isOthersLanguageSelected, setIsOthersLanguageSelected] = useState(false);
    const [isOtherLanguageEditable, setIsOtherLanguageEditable] = useState(false);
    const [isOthersServiceSelected, setIsOthersServiceSelected] = useState(false);
    const [isOtherServiceEditable, setIsOtherServiceEditable] = useState(false);
    const [isOthersSubjectSelected, setIsOthersSubjectSelected] = useState(false);
    const [isOtherSubjectEditable, setIsOtherSubjectEditable] = useState(false);
    const [isOthersCertificationSelected, setIsOthersCertificationSelected] = useState(false);
    const [isOtherCertificationEditable, setIsOtherCertificationEditable] = useState(false);

    const handleLanguageSelectOthersOnChecked = () => {
        setIsOtherLanguageEditable(!isOtherLanguageEditable);
        setIsOthersLanguageSelected(true);
    };
    const handleLanguageSelectOthersUnChecked = () => {
        setIsOthersLanguageSelected(false);
    };

    const handleServicesSelectOthersOnChecked = () => {
        setIsOtherServiceEditable(!isOtherServiceEditable);
        setIsOthersServiceSelected(true);
    };
    const handleServicesSelectOthersUnChecked = () => {
        setIsOthersServiceSelected(false);
    };

    const handleSubjectsSelectOthersOnChecked = () => {
        setIsOtherSubjectEditable(!isOtherSubjectEditable);
        setIsOthersSubjectSelected(true);
    };
    const handleSubjectsSelectOthersUnChecked = () => {
        setIsOthersSubjectSelected(false);
    };

    const handleCertificationsSelectOthersOnChecked = () => {
        setIsOtherCertificationEditable(!isOtherCertificationEditable);
        setIsOthersCertificationSelected(true);
    };
    const handleCertificationsSelectOthersUnChecked = () => {
        setIsOthersCertificationSelected(false);
    };

    const handleAddressEditToggle = () => setIsAddressEditable(!isAddressEditable);
    const handleFirstNameEditToggle = () => setIsFirstNameEditable(!isFirstNameEditable);
    const handleLastNameEditToggle = () => setIsLastNameEditable(!isLastNameEditable);
    const handlePostalCodeEditToggle = () => setIsPostalCodeEditable(!isPostalCodeEditable);
    const handleCityEditToggle = () => setIsCityEditable(!isCityEditable);
    const handleProvinceEditToggle = () => setIsProvinceEditable(!isProvinceEditable);
    const handleEmailEditToggle = () => setIsEmailEditable(!isEmailEditable);
    const handlePhoneEditToggle = () => setIsPhoneEditable(!isPhoneEditable);
    const handleDescriptionEditToggle = () => setIsDescriptionEditable(!isDescriptionEditable);

    const updateFirstName = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const value = e.target.value;
            const letters = /^[A-Za-z]+$/;
            if (!ValidationUtils.isBlank(value) && value.match(letters)) {
                const newProviderDetails = {
                    ...provider.user_details,
                    first_name: value,
                };
                setProvider({
                    ...provider,
                    user_details: newProviderDetails,
                });
                setIsFirstNameValid(false);
                setIsFirstNameEditable(false);
                updateUser(newProviderDetails);
                console.log(`First name: ${value} updated`);
            } else {
                setIsFirstNameValid(true);
                setFirstNameError(`Please enter a valid first name`);
            }
        }
    };

    const updateLastName = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const value = e.target.value;
            const letters = /^[A-Za-z]+$/;
            if (!ValidationUtils.isBlank(value) && value.match(letters)) {
                const newProviderDetails = {
                    ...provider.user_details,
                    last_name: value,
                };
                setProvider({
                    ...provider,
                    user_details: newProviderDetails,
                });
                setIsLastNameValid(false);
                setIsLastNameEditable(false);
                updateUser(newProviderDetails);
            } else {
                setIsLastNameValid(true);
                setLastNameError(`Please enter a valid last name`);
            }
        }
    };

    const updateAddress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const value = e.target.value;
            if (!ValidationUtils.isBlank(value) && value.length >= 5 && value.length <= 100) {
                const newProviderDetails = {
                    ...provider,
                    address: value,
                };
                setProvider(newProviderDetails)
                setIsAddressValid(false);
                setIsAddressEditable(false);
                updateUser(newProviderDetails);
            } else {
                setIsAddressValid(true);
                setAddressError(`Please enter a valid address`);
            }
        }
    };
    const updatePostalCode = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const value = e.target.value;
            if (!ValidationUtils.validateCanadianPostalCode(value)) {
                const newProviderDetails = {
                    ...provider,
                    postal_code: value,
                };
                setProvider(newProviderDetails);
                setIsPostalCodeValid(false);
                setIsPostalCodeEditable(false);
                updateUser(newProviderDetails);
            } else {
                setIsPostalCodeValid(true);
                setPostalCodeError(`Please enter a valid postal code`);
            }
        }
    };



    const updateCity = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const value = e.target.value;
            if (!ValidationUtils.isBlank(value)) {
                const newProviderDetails = {
                    ...provider,
                    city: value,
                };
                setProvider(newProviderDetails);
                setIsCityValid(false);
                setIsCityEditable(false);
                updateUser(newProviderDetails);
            } else {
                setIsCityValid(true);
                setCityError(`Please enter a valid city`);
            }
        }
    };

    const updateProvince = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const value = e.target.value;
            if (!ValidationUtils.isBlank(value)) {
                const newProviderDetails = {
                    ...provider,
                    province: value,
                };
                setProvider(newProviderDetails);
                setIsProvinceValid(false);
                setIsProvinceEditable(false);
                updateUser(newProviderDetails);
            } else {
                setIsProvinceValid(true);
                setProvinceError(`Please enter a valid province`);
            }
        }
    };

    const updateEmail = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const value = e.target.value;
            if (!ValidationUtils.validateEmail(value)) {
                const newProviderDetails = {
                    ...provider,
                    email: value,
                };
                setProvider(newProviderDetails);
                setIsEmailValid(false);
                setIsEmailEditable(false);
                updateUser(newProviderDetails);
            } else {
                setIsEmailValid(true);
                setEmailError(`Please enter a valid email`);
            }
        }
    };

    const updatePhone = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const value = e.target.value;
            if (!ValidationUtils.validateCanadianPhoneNumber(value)) {
                const newProviderDetails = {
                    ...provider,
                    phone: value,
                };
                setProvider(newProviderDetails);
                setIsPhoneValid(false);
                setIsPhoneEditable(false);
                updateUser(newProviderDetails);
            } else {
                setIsPhoneValid(true);
                setPhoneError(`Please enter a valid phone number`);
            }
        }
    };

    const updateDescription = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            const value = e.target.value;
            if (!ValidationUtils.isBlank(value)) {
                const newProviderDetails = {
                    ...provider.user_details,
                    description: value,
                };
                setProvider({
                    ...provider,
                    user_details: newProviderDetails,
                });
                setIsDescriptionValid(false);
                setIsDescriptionEditable(false);
                updateUser(newProviderDetails);
            } else {
                setIsDescriptionValid(true);
                setDescriptionError(`Please enter a valid description`);
            }
        }
    };

    const updateLanguageChecked = (language) => {
        const newProviderDetails = {
            ...provider.user_details,
            language: [...provider.user_details.language, language],
        };
        setProvider({
            ...provider,
            user_details: newProviderDetails,
        });
        updateUser(newProviderDetails);
        console.log(`${language} added`);
    };

    const updateLanguageUnChecked = (language) => {
        const newProviderDetails = {
            ...provider.user_details,
            language: provider.user_details.language.filter((lang) => lang !== language),
        };
        setProvider({
            ...provider,
            user_details: newProviderDetails,
        });
        updateUser(newProviderDetails);
        console.log(`${language} removed`);
    };
    useEffect(() => {
        console.log(provider);
    }, [provider]);

    const updateOtherLanguage = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            const value = e.target.value;
            if (!ValidationUtils.isBlank(value)) {
                const newLanguages = [...provider.user_details.language, value];

                const newProviderDetails = {
                    ...provider.user_details,
                    language: newLanguages,
                };
                setProvider({
                    ...provider,
                    user_details: newProviderDetails,
                });
                console.log(`${value} language added!`);
                updateUser(newProviderDetails);
            }
        }
    };

    const updateServicesChecked = (service) => {
        const newProviderDetails = {
            ...provider.user_details,
            service: [...provider.user_details.service, service],
        };
        setProvider({
            ...provider,
            user_details: newProviderDetails,
        });
        updateUser(newProviderDetails);
        console.log(`${service} added`);
    };

    const updateServiceUnChecked = (service) => {
        const newProviderDetails = {
            ...provider.user_details,
            service: provider.user_details.service.filter((serv) => serv !== service),
        };
        setProvider({
            ...provider,
            user_details: newProviderDetails,
        });
        updateUser(newProviderDetails);
        console.log(`${service} removed`);
    };

    const updateOtherService = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            const value = e.target.value;
            if (!ValidationUtils.isBlank(value)) {
                const newService = [...provider.user_details.service, value];

                const newProviderDetails = {
                    ...provider.user_details,
                    service: newService,
                };
                setProvider({
                    ...provider,
                    user_details: newProviderDetails,
                });
                console.log(`${value} language added!`);
                updateUser(newProviderDetails);
            }
        }
    };

    const updateSubjectsChecked = (subject) => {
        const newProviderDetails = {
            ...provider.user_details,
            subject: [...provider.user_details.subject, subject],
        };
        setProvider({
            ...provider,
            user_details: newProviderDetails,
        });
        updateUser(newProviderDetails);
        console.log(`${subject} added`);
    };

    const updateSubjectsUnChecked = (subject) => {
        const newProviderDetails = {
            ...provider.user_details,
            subject: provider.user_details.subject.filter((subj) => subj !== subject),
        };
        setProvider({
            ...provider,
            user_details: newProviderDetails,
        });
        updateUser(newProviderDetails);
        console.log(`${subject} removed`);
    };

    const updateOtherSubject = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            const value = e.target.value;
            if (!ValidationUtils.isBlank(value)) {
                const newSubject = [...provider.user_details.subject, value];

                const newProviderDetails = {
                    ...provider.user_details,
                    subject: newSubject,
                };
                setProvider({
                    ...provider,
                    user_details: newProviderDetails,
                });
                console.log(`${value} added!`);
                updateUser(newProviderDetails);
            }
        }
    };

    const updateCertificationChecked = (certification) => {
        const newProviderDetails = {
            ...provider.user_details,
            certification: [...provider.user_details.certification, certification],
        };
        setProvider({
            ...provider,
            user_details: newProviderDetails,
        });
        updateUser(newProviderDetails);
        console.log(`${certification} added`);
    };

    const updateCertificationsUnChecked = (certification) => {
        const newProviderDetails = {
            ...provider.user_details,
            certification: provider.user_details.certification.filter(
                (cert) => cert !== certification
            ),
        };
        setProvider({
            ...provider,
            user_details: newProviderDetails,
        });
        updateUser(newProviderDetails);
        console.log(`${certification} removed`);
    };

    const updateOtherCertification = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            const value = e.target.value;
            if (!ValidationUtils.isBlank(value)) {
                const newCertification = [...provider.user_details.certification, value];

                const newProviderDetails = {
                    ...provider.user_details,
                    certification: newCertification,
                };
                setProvider({
                    ...provider,
                    user_details: newProviderDetails,
                });
                setIsOtherCertificationEditable(false);
                console.log(`${value} added!`);
                updateUser(newProviderDetails);
            } else {
                setIsOtherCertificationEditable(true);
                return;
            }
        }
    };


        const updateHasCar = (value) => {
            const newProviderDetails = {
                ...provider.user_details,
                has_car: value,
            };
            setProvider({
                ...provider,
                user_details: newProviderDetails,
            });

            updateUser(newProviderDetails);
        };

        const updateHasValidDriverLicense = (value) => {
            if (!ValidationUtils.isBlank(value)) {
                const newProviderDetails = {
                    ...provider.user_details,
                    has_valid_driver_license: value,
                };
                setProvider({
                    ...provider,
                    user_details: newProviderDetails,
                });

                updateUser(newProviderDetails);
                console.log(`${value} updated`);
            }
        };

    const updateWorkExperience = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const exp = e.target.value;
            if (!ValidationUtils.isBlank(exp)) {
                const newProviderDetails = {
                    ...provider.user_details,
                    work_experience: exp,
                };
                setProvider({
                    ...provider,
                    user_details: newProviderDetails,
                });
                setWorkExperienceError('');
                setIsWorkExperienceValid(false);
                updateUser(newProviderDetails);
            } else {
                setIsWorkExperienceValid(true);
                setWorkExperienceError('Please enter your experience in years');
            }
        }
    };

    const updateHourlyRate = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const rate = e.target.value;
            if (!ValidationUtils.isBlank(rate)) {
                const newProviderDetails = {
                    ...provider.user_details,
                    hourly_rate: rate,
                };
                setProvider({
                    ...provider,
                    user_details: newProviderDetails,
                });
                setHourlyRateError('');
                setIsHourlyRateValid(false);
                updateUser(newProviderDetails);
            } else {
                setIsHourlyRateValid(true);
                setHourlyRateError('Please enter a valid rate');
            }
        }
    };

    useEffect(() => {
        if (location.state) {
            setProvider(location.state.provider);
        } else {
            setIsAuthenticatedCustomer(true);
            setProvider(authenticatedCustomer);
        }
    }, []);

    return (
        <>
            {provider && provider.type === UserType.CHILDCARE && (
                <div className="container signup-container learn-more-container p-md-5 my-5 py-5 px-4">
                    <div className="row mb-4">
                        <div className="col-md-3">
                            {provider.user_details.profile_url ? (
                                <img
                                    src={provider.user_details.profile_url}
                                    alt={
                                        provider.user_details.first_name +
                                        ' ' +
                                        provider.user_details.last_name
                                    }
                                    className="title-image rounded-circle w-100 mb-4"
                                />
                            ) : (
                                <img
                                    src={ProfileImagePlaceholder}
                                    alt="Child-care image placeholder"
                                    className="title-image rounded-circle w-100 mb-4"
                                />
                            )}
                            <ButtonLight
                                buttonText="Update profile image"
                                buttonStyles="w-100 mt-3"
                            />

                            <ButtonDark
                                buttonStyles="w-100 mt-3"
                                buttonText="More"
                                handleOnClick={handleOpenMoreDialog}
                            />

                            <div className="col-md-12 col-12 mt-4">
                                <InputField
                                    inputStyle="mt-4 "
                                    inputType="text"
                                    inputLabel="First Name"
                                    isEditable={true}
                                    defaultValue={provider.user_details.first_name}
                                    errors={isFirstNameValid}
                                    errorMessage={isFirstNameValid ? firstNameError : null}
                                    handleOnChange={updateFirstName}
                                    isDisabled={!isFirstNameEditable}
                                    handleOnEdit={handleFirstNameEditToggle}
                                    onKeyDown={updateFirstName}
                                />
                                <InputField
                                    inputStyle="mt-4"
                                    inputType="text"
                                    inputLabel="Last Name"
                                    isEditable={true}
                                    defaultValue={provider.user_details.last_name}
                                    errors={isLastNameValid}
                                    errorMessage={isLastNameValid ? lastNameError : null}
                                    isDisabled={!isLastNameEditable}
                                    handleOnEdit={handleLastNameEditToggle}
                                    handleOnChange={updateLastName}
                                    onKeyDown={updateLastName}
                                />
                            </div>
                        </div>

                        <div className="col-md-9 ">
                            <div className="row">
                                <InputField
                                    inputStyle="mt-4 col-md-6"
                                    inputLabel="Address"
                                    isEditable={true}
                                    defaultValue={provider.address}
                                    errors={isAddressValid}
                                    errorMessage={isAddressValid ? addressError : null}
                                    handleOnChange={updateAddress}
                                    onKeyDown={updateAddress}
                                    isDisabled={!isAddressEditable}
                                    handleOnEdit={handleAddressEditToggle}
                                />
                                <InputField
                                    inputStyle="mt-4 col-md-6"
                                    inputLabel="Postal code"
                                    inputType="text"
                                    isEditable={true}
                                    defaultValue={provider.postal_code}
                                    errors={isPostalCodeValid}
                                    errorMessage={isPostalCodeValid ? postalCodeError : null}
                                    handleOnChange={updatePostalCode}
                                    onKeyDown={updatePostalCode}
                                    isDisabled={!isPostalCodeEditable}
                                    handleOnEdit={handlePostalCodeEditToggle}
                                />
                            </div>
                            <div className="row">
                                <InputField
                                    inputStyle="mt-4 col-md-6"
                                    inputType="text"
                                    inputLabel="City"
                                    isEditable={true}
                                    defaultValue={provider.city}
                                    errors={isCityValid}
                                    errorMessage={isCityValid ? cityError : null}
                                    handleOnChange={updateCity}
                                    isDisabled={!isCityEditable}
                                    handleOnEdit={handleCityEditToggle}
                                    onKeyDown={updateCity}
                                />
                                <InputField
                                    inputStyle="mt-4 col-md-6"
                                    inputLabel="State/Province"
                                    inputType="text"
                                    isEditable={true}
                                    defaultValue={provider.province}
                                    errors={isProvinceValid}
                                    errorMessage={isProvinceValid ? provinceError : null}
                                    handleOnChange={updateProvince}
                                    isDisabled={!isProvinceEditable}
                                    handleOnEdit={handleProvinceEditToggle}
                                    onKeyDown={updateProvince}
                                />
                            </div>
                            <div className="row ">
                                <InputField
                                    inputStyle="mt-4 col-md-6"
                                    inputLabel="Email"
                                    inputType="email"
                                    isEditable={true}
                                    defaultValue={provider.email}
                                    errors={isEmailValid}
                                    errorMessage={isEmailValid ? emailError : null}
                                    handleOnChange={updateEmail}
                                    isDisabled={!isEmailEditable}
                                    handleOnEdit={handleEmailEditToggle}
                                    onKeyDown={updateEmail}
                                />
                                <InputField
                                    inputStyle="mt-4 col-md-6"
                                    inputLabel="Phone"
                                    inputType="tel"
                                    isEditable={true}
                                    defaultValue={provider.phone}
                                    errors={isPhoneValid}
                                    errorMessage={isPhoneValid ? phoneError : null}
                                    handleOnChange={updatePhone}
                                    isDisabled={!isPhoneEditable}
                                    handleOnEdit={handlePhoneEditToggle}
                                    onKeyDown={updatePhone}
                                />
                            </div>
                            <TextArea
                                inputStyle="mt-4"
                                textarea_inputStyle="text-area-style"
                                inputLabel="What should our caregivers know about you?"
                                isEditable={true}
                                defaultValue={provider.user_details.description}
                                errors={isDescriptionValid}
                                errorMessage={isDescriptionValid ? descriptionError : null}
                                handleOnChange={updateDescription}
                                isDisabled={!isDescriptionEditable}
                                handleOnEdit={handleDescriptionEditToggle}
                                onKeyDown={updateDescription}
                            />
                        </div>
                    </div>
                    <>
                        <div className={`modal ${moreDialog ? 'show' : ''}`}>
                            <div
                                onClick={closeMoreDialog}
                                className="modal-dialog modal-dialog-centered"
                                ref={moreDialogRef}
                            >
                                <div className="modal-content modal-anim newsletter-modal-content">
                                    <div className="modal-header border-bottom-0">
                                        <div className="w-100 text-center">
                                            <label className="heading">More options</label>
                                        </div>
                                        <i
                                            className="fa fa-times close cursor-pointer"
                                            data-dismiss="modal"
                                            onClick={() => handleCloseMoreDialog()}
                                        />
                                    </div>
                                    <form
                                        className="modal-body"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <div className="row">
                                            <label className="heading">Lanuages</label>
                                            <div className="d-flex mb-3">
                                                <ManagedCheckbox
                                                    checkboxContainerStyle="col-6"
                                                    checkboxLabel="French"
                                                    checkboxId="language-french"
                                                    checkboxValue="french"
                                                    isChecked={provider?.user_details?.language?.includes(
                                                        'french'
                                                    )}
                                                    handleOnChecked={updateLanguageChecked}
                                                    handleOnUnChecked={updateLanguageUnChecked}
                                                />
                                                <ManagedCheckbox
                                                    checkboxContainerStyle="col-6"
                                                    checkboxLabel="Tagalog"
                                                    checkboxId="language-tagalog"
                                                    checkboxValue="tagalog"
                                                    checked={provider?.user_details?.language?.includes(
                                                        'tagalog'
                                                    )}
                                                    handleOnChecked={updateLanguageChecked}
                                                    handleOnUnChecked={updateLanguageUnChecked}
                                                />
                                            </div>
                                            <div className="d-flex mb-3">
                                                <ManagedCheckbox
                                                    checkboxContainerStyle="col-6"
                                                    checkboxLabel="English"
                                                    checkboxId="language-english"
                                                    checkboxValue="english"
                                                    isChecked={provider?.user_details?.language?.includes(
                                                        'english'
                                                    )}
                                                    handleOnChecked={updateLanguageChecked}
                                                    handleOnUnChecked={updateLanguageUnChecked}
                                                />
                                                <ManagedCheckbox
                                                    checkboxContainerStyle="col-6"
                                                    checkboxLabel="Ukrainian"
                                                    checkboxId="language-ukrainian"
                                                    checkboxValue="ukrainian"
                                                    checked={provider?.user_details?.language?.includes(
                                                        'ukrainian'
                                                    )}
                                                    handleOnChecked={updateLanguageChecked}
                                                    handleOnUnChecked={updateLanguageUnChecked}
                                                />
                                            </div>
                                            <div className="d-flex mb-3">
                                                <ManagedCheckbox
                                                    checkboxContainerStyle="col-6"
                                                    checkboxLabel="Spanish"
                                                    checkboxId="language-spanish"
                                                    checkboxValue="spanish"
                                                    checked={provider?.user_details?.language?.includes(
                                                        'spanish'
                                                    )}
                                                    handleOnChecked={updateLanguageChecked}
                                                    handleOnUnChecked={updateLanguageUnChecked}
                                                />
                                                <ManagedCheckbox
                                                    checkboxContainerStyle="col-6"
                                                    checkboxLabel="Arabic"
                                                    checkboxId="language-arabic"
                                                    checkboxValue="arabic"
                                                    checked={provider?.user_details?.language?.includes(
                                                        'arabic'
                                                    )}
                                                    handleOnChecked={updateLanguageChecked}
                                                    handleOnUnChecked={updateLanguageUnChecked}
                                                />
                                            </div>
                                            <div className="d-flex mb-3">
                                                <ManagedCheckbox
                                                    checkboxContainerStyle="col-6"
                                                    checkboxLabel="German"
                                                    checkboxId="language-german"
                                                    checkboxValue="german"
                                                    checked={provider?.user_details?.language?.includes(
                                                        'german'
                                                    )}
                                                    handleOnChecked={updateLanguageChecked}
                                                    handleOnUnChecked={updateLanguageUnChecked}
                                                />
                                                <ManagedCheckbox
                                                    checkboxContainerStyle="col-6"
                                                    checkboxLabel="Others"
                                                    checkboxId="language-others"
                                                    checkboxValue=""
                                                    handleOnChecked={
                                                        handleLanguageSelectOthersOnChecked
                                                    }
                                                    handleOnUnChecked={
                                                        handleLanguageSelectOthersUnChecked
                                                    }
                                                />
                                            </div>
                                            {isOthersLanguageSelected ? (
                                                <div className="row">
                                                    <div className="col-12">
                                                        <TextArea
                                                            inputLabel=""
                                                            inputStyle="col-12"
                                                            inputPlaceholder="Other languages..."
                                                            handleOnChange={updateOtherLanguage}
                                                            onKeyDown={updateOtherLanguage}
                                                            handleOnEdit={
                                                                handleLanguageSelectOthersOnChecked
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            ) : null}
                                        </div>

                                        <div className="row">
                                            <label className="heading">Services</label>
                                            <div className="d-flex mb-3">
                                                <ManagedCheckbox
                                                    checkboxContainerStyle="col-6"
                                                    checkboxLabel="Cooking"
                                                    checkboxId="service-cooking"
                                                    checkboxValue="cooking"
                                                    handleOnChecked={updateServicesChecked}
                                                    handleOnUnChecked={updateServiceUnChecked}
                                                />
                                                <ManagedCheckbox
                                                    checkboxContainerStyle="col-6"
                                                    checkboxId="service-bedtime"
                                                    checkboxValue="bedtime"
                                                    checkboxLabel="Bedtime"
                                                    handleOnChecked={updateServicesChecked}
                                                    handleOnUnChecked={updateServiceUnChecked}
                                                />
                                            </div>
                                            <div className="d-flex mb-3">
                                                <ManagedCheckbox
                                                    checkboxContainerStyle="col-6"
                                                    checkboxId="service-bathing"
                                                    checkboxValue="bathing"
                                                    checkboxLabel="Bathing"
                                                    handleOnChecked={updateServicesChecked}
                                                    handleOnUnChecked={updateServiceUnChecked}
                                                />
                                                <ManagedCheckbox
                                                    checkboxContainerStyle="col-6"
                                                    checkboxId="service-excursions"
                                                    checkboxValue="excursions"
                                                    checkboxLabel="Excursions"
                                                    handleOnChecked={updateServicesChecked}
                                                    handleOnUnChecked={updateServiceUnChecked}
                                                />
                                            </div>
                                            <div className="d-flex mb-3">
                                                <ManagedCheckbox
                                                    checkboxContainerStyle="col-6"
                                                    checkboxId="service-housekeeping"
                                                    checkboxValue="housekeeping"
                                                    checkboxLabel="Housekeeping"
                                                    handleOnChecked={updateServicesChecked}
                                                    handleOnUnChecked={updateServiceUnChecked}
                                                />
                                                <ManagedCheckbox
                                                    checkboxContainerStyle="col-6"
                                                    checkboxId="service-others"
                                                    checkboxValue=""
                                                    checkboxLabel="Others"
                                                    handleOnChecked={
                                                        handleServicesSelectOthersOnChecked
                                                    }
                                                    handleOnUnChecked={
                                                        handleServicesSelectOthersUnChecked
                                                    }
                                                />
                                            </div>
                                            {isOthersServiceSelected ? (
                                                <div className="row">
                                                    <div className="col-12">
                                                        <TextArea
                                                            inputLabel=""
                                                            inputStyle="col-12"
                                                            inputPlaceholder="Other services..."
                                                            handleOnChange={updateOtherService}
                                                            onKeyDown={updateOtherService}
                                                            handleOnEdit={
                                                                handleServicesSelectOthersOnChecked
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            ) : null}
                                        </div>
                                        <div className="row">
                                            <label className="heading">Subjects</label>
                                            <div className="d-flex mb-3">
                                                <ManagedCheckbox
                                                    checkboxContainerStyle="col-6"
                                                    checkboxLabel="Math"
                                                    checkboxId="sub-math"
                                                    checkboxValue="math"
                                                    handleOnChecked={updateSubjectsChecked}
                                                    handleOnUnChecked={updateSubjectsUnChecked}
                                                />
                                                <ManagedCheckbox
                                                    checkboxContainerStyle="col-6"
                                                    checkboxLabel="Science"
                                                    checkboxId="sub-science"
                                                    checkboxValue="science"
                                                    handleOnChecked={updateSubjectsChecked}
                                                    handleOnUnChecked={updateSubjectsUnChecked}
                                                />
                                            </div>
                                            <div className="d-flex mb-3">
                                                <ManagedCheckbox
                                                    checkboxContainerStyle="col-6"
                                                    checkboxLabel="Literature"
                                                    checkboxId="sub-literature"
                                                    checkboxValue="literature"
                                                    handleOnChecked={updateSubjectsChecked}
                                                    handleOnUnChecked={updateSubjectsUnChecked}
                                                />
                                                <ManagedCheckbox
                                                    checkboxContainerStyle="col-6"
                                                    checkboxLabel="Music"
                                                    checkboxId="sub-music"
                                                    checkboxValue="music"
                                                    handleOnChecked={updateSubjectsChecked}
                                                    handleOnUnChecked={updateSubjectsUnChecked}
                                                />
                                            </div>
                                            <div className="d-flex mb-3">
                                                <ManagedCheckbox
                                                    checkboxContainerStyle="col-6"
                                                    checkboxLabel="Others"
                                                    checkboxId="sub-others"
                                                    checkboxValue=""
                                                    handleOnChecked={
                                                        handleSubjectsSelectOthersOnChecked
                                                    }
                                                    handleOnUnChecked={
                                                        handleSubjectsSelectOthersUnChecked
                                                    }
                                                />
                                            </div>
                                            {isOthersSubjectSelected ? (
                                                <div className="row">
                                                    <div className="col-12">
                                                        <TextArea
                                                            inputLabel=""
                                                            inputStyle="col-12"
                                                            inputPlaceholder="Other subjects..."
                                                            handleOnChange={updateOtherSubject}
                                                            onKeyDown={updateOtherSubject}
                                                            handleOnEdit={
                                                                handleSubjectsSelectOthersOnChecked
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            ) : null}
                                        </div>
                                        <div className="row">
                                            <label className="heading">Certifications</label>
                                            <div className="d-flex mb-3">
                                                <ManagedCheckbox
                                                    checkboxContainerStyle="col-6"
                                                    checkboxLabel="ECE"
                                                    checkboxId="cert-ece"
                                                    checkboxValue="ece"
                                                    handleOnChecked={updateCertificationChecked}
                                                    handleOnUnChecked={
                                                        updateCertificationsUnChecked
                                                    }
                                                />
                                                <ManagedCheckbox
                                                    checkboxContainerStyle="col-6"
                                                    checkboxLabel="First Aid"
                                                    checkboxId="cert-first-aid"
                                                    checkboxValue="first aid"
                                                    handleOnChecked={updateCertificationChecked}
                                                    handleOnUnChecked={
                                                        updateCertificationsUnChecked
                                                    }
                                                />
                                            </div>
                                            <div className="d-flex mb-3">
                                                <ManagedCheckbox
                                                    checkboxContainerStyle="col-6"
                                                    checkboxLabel="Academic"
                                                    checkboxId="cert-academic"
                                                    checkboxValue="academic"
                                                    handleOnChecked={updateCertificationChecked}
                                                    handleOnUnChecked={
                                                        updateCertificationsUnChecked
                                                    }
                                                />
                                                <ManagedCheckbox
                                                    checkboxContainerStyle="col-6"
                                                    checkboxLabel="Others"
                                                    checkboxId="cert-others"
                                                    checkboxValue=""
                                                    handleOnChecked={
                                                        handleCertificationsSelectOthersOnChecked
                                                    }
                                                    handleOnUnChecked={
                                                        handleCertificationsSelectOthersUnChecked
                                                    }
                                                />
                                            </div>
                                            {isOthersCertificationSelected ? (
                                                <div className="row">
                                                    <div className="col-12">
                                                        <TextArea
                                                            inputLabel=""
                                                            inputStyle="col-12"
                                                            inputPlaceholder="Other certifications..."
                                                            handleOnChange={
                                                                updateOtherCertification
                                                            }
                                                            onKeyDown={updateOtherCertification}
                                                            handleOnEdit={
                                                                handleCertificationsSelectOthersOnChecked
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            ) : null}
                                        </div>
                                        <div className="row">
                                            <p className="generic-paragraph">
                                                Do you have a valid drivers license?
                                            </p>
                                            <div className="d-flex mb-3">
                                                <RadioButton
                                                    radioContainerStyle="col-6 mb-3"
                                                    radioLabel="Yes"
                                                    radioButtonId="has_valid_driver_license"
                                                    radioName="has_valid_driver_license"
                                                    value={1}
                                                    selectBoolean={true}
                                                    isChecked={
                                                        provider.user_details
                                                            .has_valid_driver_license
                                                            ? true
                                                            : false
                                                    }
                                                    handleOnChange={updateHasValidDriverLicense}
                                                />
                                                <RadioButton
                                                    radioContainerStyle="col-6 mb-3"
                                                    radioLabel="No"
                                                    radioButtonId="has_valid_driver_license"
                                                    radioName="has_valid_driver_license"
                                                    value={0}
                                                    selectBoolean={true}
                                                    isChecked={
                                                        provider.user_details
                                                            .has_valid_driver_license
                                                            ? false
                                                            : true
                                                    }
                                                    handleOnChange={updateHasValidDriverLicense}
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <p className="generic-paragraph">Do you own a car?</p>
                                            <div className="d-flex mb-3">
                                                <RadioButton
                                                    radioContainerStyle="col-6 mb-3"
                                                    radioLabel="Yes"
                                                    radioButtonId="yes"
                                                    radioID="has_car"
                                                    radioName="has_car"
                                                    value={1}
                                                    selectBoolean={true}
                                                    isChecked={
                                                        provider.user_details.has_car ? true : false
                                                    }
                                                    handleOnChange={updateHasCar}
                                                />
                                                <RadioButton
                                                    radioContainerStyle="col-6 mb-3"
                                                    radioLabel="No"
                                                    radioButtonId="has_car"
                                                    radioName="has_car"
                                                    value={0}
                                                    selectBoolean={true}
                                                    isChecked={
                                                        provider.user_details.has_car ? false : true
                                                    }
                                                    handleOnChange={updateHasCar}
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="d-flex mb-3">
                                                <InputField
                                                    inputType="number"
                                                    inputLabel="Work Experience"
                                                    inputStyle="col-12 mb-4"
                                                    inputPlaceholder={
                                                        provider.user_details.work_experience
                                                    }
                                                    inputId="last-name-field"
                                                    errorStyle=""
                                                    inputWrapperStyle="year-after"
                                                    errors={isWorkExperienceValid}
                                                    errorMessage={
                                                        isWorkExperienceValid
                                                            ? workExperienceError
                                                            : null
                                                    }
                                                    handleOnChange={updateWorkExperience}
                                                    onKeyDown={updateWorkExperience}
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="d-flex mb-3">
                                                <InputField
                                                    inputType="number"
                                                    inputLabel="Expected hourly rate"
                                                    inputStyle="col-12 mb-3"
                                                    inputPlaceholder={
                                                        provider.user_details.hourly_rate
                                                    }
                                                    inputId="rate-field"
                                                    errorStyle=""
                                                    inputWrapperStyle="dollar-before per-hour-after"
                                                    errors={isHourlyRateValid}
                                                    errorMessage={
                                                        isHourlyRateValid ? hourlyRateError : null
                                                    }
                                                    handleOnChange={updateHourlyRate}
                                                    onKeyDown={updateHourlyRate}
                                                />
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <ButtonLight
                                                buttonText="Save"
                                                type="submit"
                                                handleOnClick={closeMoreDialog}
                                            />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        {showBackdrop && (
                            <div
                                className={` ${moreDialog ? 'modal-backdrop fade show' : ''}`}
                                id="backdrop"
                                style={{ display: 'block' }}
                            ></div>
                        )}
                    </>
                </div>
            )}
        </>
    );
}

export default ChildCareEditProfile;
