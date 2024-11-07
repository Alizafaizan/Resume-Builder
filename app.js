var ResumeBuilder = /** @class */ (function () {
    function ResumeBuilder() {
        this.resume = {
            personalInfo: {
                fullName: "",
                email: "",
                phone: "",
                location: "",
            },
            profilePicture: "",
            summary: "",
            experience: [],
            education: [],
            skills: [],
            languages: [],
        };
        this.experienceList = document.getElementById("experienceList");
        this.educationList = document.getElementById("educationList");
        this.previewSection = document.getElementById("resumePreview");
        this.initializeEventListeners();
    }
    ResumeBuilder.prototype.initializeEventListeners = function () {
        var _this = this;
        var _a, _b, _c, _d;
        (_a = document
            .getElementById("addExperience")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () { return _this.addExperienceField(); });
        (_b = document
            .getElementById("addEducation")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function () { return _this.addEducationField(); });
        (_c = document
            .getElementById("resumeForm")) === null || _c === void 0 ? void 0 : _c.addEventListener("submit", function (e) { return _this.handleSubmit(e); });
        (_d = document
            .getElementById("printResume")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", function () { return window.print(); });
    };
    ResumeBuilder.prototype.addExperienceField = function () {
        var experienceItem = document.createElement("div");
        experienceItem.className = "experience-item";
        experienceItem.innerHTML = "\n            <input type=\"text\" placeholder=\"Job Title\" required>\n            <input type=\"text\" placeholder=\"Company\" required>\n            <input type=\"text\" placeholder=\"Start Date\" required>\n            <input type=\"text\" placeholder=\"End Date\" required>\n            <textarea placeholder=\"Description\" rows=\"3\" required></textarea>\n            <button type=\"button\" onclick=\"this.parentElement.remove()\">Remove</button>\n        ";
        this.experienceList.appendChild(experienceItem);
    };
    ResumeBuilder.prototype.addEducationField = function () {
        var educationItem = document.createElement("div");
        educationItem.className = "education-item";
        educationItem.innerHTML = "\n            <input type=\"text\" placeholder=\"Degree\" required>\n            <input type=\"text\" placeholder=\"School\" required>\n            <input type=\"text\" placeholder=\"Graduation Date\" required>\n            <button type=\"button\" onclick=\"this.parentElement.remove()\">Remove</button>\n        ";
        this.educationList.appendChild(educationItem);
    };
    ResumeBuilder.prototype.collectFormData = function () {
        this.resume.personalInfo = {
            fullName: document.getElementById("fullName").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            location: document.getElementById("location").value,
        };
        this.resume.profilePicture = document.getElementById("profilePicture").value;
        this.resume.summary = document.getElementById("summary").value;
        this.resume.experience = Array.from(this.experienceList.getElementsByClassName("experience-item")).map(function (item) { return ({
            title: item.querySelector('input[placeholder="Job Title"]').value,
            company: item.querySelector('input[placeholder="Company"]').value,
            startDate: item.querySelector('input[placeholder="Start Date"]').value,
            endDate: item.querySelector('input[placeholder="End Date"]').value,
            description: item.querySelector("textarea")
                .value,
        }); });
        this.resume.education = Array.from(this.educationList.getElementsByClassName("education-item")).map(function (item) { return ({
            degree: item.querySelector('input[placeholder="Degree"]').value,
            school: item.querySelector('input[placeholder="School"]').value,
            graduationDate: item.querySelector('input[placeholder="Graduation Date"]').value,
        }); });
        this.resume.skills = document.getElementById("skills").value
            .split(",")
            .map(function (skill) { return skill.trim(); });
        this.resume.languages = document.getElementById("languages").value
            .split(",")
            .map(function (languages) { return languages.trim(); });
    };
    ResumeBuilder.prototype.generatePreview = function () {
        this.previewSection.innerHTML = "\n        <div class=\"profile-picture\">\n            <img src=\"".concat(this.resume.profilePicture || "/api/placeholder/200/200", "\" alt=\"Profile Picture\">\n        </div>\n            <h1>").concat(this.resume.personalInfo.fullName, "</h1>\n            <div class=\"contact-info\">\n                <p>").concat(this.resume.personalInfo.email, " | ").concat(this.resume.personalInfo.phone, "</p>\n                <p>").concat(this.resume.personalInfo.location, "</p>\n            </div>\n\n            <div class=\"section\">\n                <h3>Professional Summary</h3>\n                <p>").concat(this.resume.summary, "</p>\n            </div>\n\n            <div class=\"section\">\n                <h3>Experience</h3>\n                ").concat(this.resume.experience
            .map(function (exp) { return "\n                    <div class=\"experience-item\">\n                        <h4>".concat(exp.title, " at ").concat(exp.company, "</h4>\n                        <p>").concat(exp.startDate, " - ").concat(exp.endDate, "</p>\n                        <p>").concat(exp.description, "</p>\n                    </div>\n                "); })
            .join(""), "\n            </div>\n\n            <div class=\"section\">\n                <h3>Education</h3>\n                ").concat(this.resume.education
            .map(function (edu) { return "\n                    <div class=\"education-item\">\n                        <h4>".concat(edu.degree, "</h4>\n                        <p>").concat(edu.school, " - ").concat(edu.graduationDate, "</p>\n                    </div>\n                "); })
            .join(""), "\n            </div>\n\n            <div class=\"section\">\n                <h3>Skills</h3>\n              ").concat(this.resume.skills.map(function (skill) { return "<p>".concat(skill, "</p>"); }).join(""), "\n            </div>\n\n            <div class=\"section\">\n                 <h3>Languages</h3>\n              ").concat(this.resume.languages.map(function (languages) { return "<p>".concat(languages, "</p>"); }).join(""), "\n            </di\n            ");
    };
    ResumeBuilder.prototype.handleSubmit = function (e) {
        e.preventDefault();
        this.collectFormData();
        this.generatePreview();
    };
    return ResumeBuilder;
}());
// Initialize the application
document.addEventListener("DOMContentLoaded", function () {
    new ResumeBuilder();
});
