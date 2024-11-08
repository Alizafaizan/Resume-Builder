var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.resume.personalInfo = {
                    fullName: document.getElementById("fullName").value,
                    email: document.getElementById("email").value,
                    phone: document.getElementById("phone").value,
                    location: document.getElementById("location").value,
                };
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
                return [2 /*return*/];
            });
        });
    };
    ResumeBuilder.prototype.generatePreview = function () {
        this.previewSection.innerHTML = "\n          <h1>".concat(this.resume.personalInfo.fullName, "</h1>\n          <div class=\"contact-info\">\n              <p>").concat(this.resume.personalInfo.email, " | ").concat(this.resume.personalInfo.phone, "</p>\n              <p>").concat(this.resume.personalInfo.location, "</p>\n          </div>\n\n          <div class=\"section\">\n              <h3>Professional Summary</h3>\n              <p>").concat(this.resume.summary, "</p>\n          </div>\n\n          <div class=\"section\">\n              <h3>Experience</h3>\n              ").concat(this.resume.experience
            .map(function (exp) { return "\n                  <div class=\"experience-item\">\n                      <h4>".concat(exp.title, " at ").concat(exp.company, "</h4>\n                      <p>").concat(exp.startDate, " - ").concat(exp.endDate, "</p>\n                      <p>").concat(exp.description, "</p>\n                  </div>\n              "); })
            .join(""), "\n          </div>\n\n          <div class=\"section\">\n              <h3>Education</h3>\n              ").concat(this.resume.education
            .map(function (edu) { return "\n                  <div class=\"education-item\">\n                      <h4>".concat(edu.degree, "</h4>\n                      <p>").concat(edu.school, " - ").concat(edu.graduationDate, "</p>\n                  </div>\n              "); })
            .join(""), "\n          </div>\n\n          <div class=\"section\">\n              <h3>Skills</h3>\n            ").concat(this.resume.skills.map(function (skill) { return "<p>".concat(skill, "</p>"); }).join(""), "\n          </div>\n\n          <div class=\"section\">\n               <h3>Languages</h3>\n            ").concat(this.resume.languages
            .map(function (languages) { return "<p>".concat(languages, "</p>"); })
            .join(""), "\n          </di\n          ");
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
