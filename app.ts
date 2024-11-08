// app.ts
interface Experience {
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Education {
  degree: string;
  school: string;
  graduationDate: string;
}

interface Resume {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
  };
  profilePicture: string;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
  languages: string[];
}

class ResumeBuilder {
  private resume: Resume = {
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

  private experienceList: HTMLDivElement;
  private educationList: HTMLDivElement;
  private previewSection: HTMLDivElement;

  constructor() {
    this.experienceList = document.getElementById(
      "experienceList"
    ) as HTMLDivElement;
    this.educationList = document.getElementById(
      "educationList"
    ) as HTMLDivElement;
    this.previewSection = document.getElementById(
      "resumePreview"
    ) as HTMLDivElement;

    this.initializeEventListeners();
  }

  private initializeEventListeners(): void {
    document
      .getElementById("addExperience")
      ?.addEventListener("click", () => this.addExperienceField());
    document
      .getElementById("addEducation")
      ?.addEventListener("click", () => this.addEducationField());
    document
      .getElementById("resumeForm")
      ?.addEventListener("submit", (e) => this.handleSubmit(e));
    document
      .getElementById("printResume")
      ?.addEventListener("click", () => window.print());
  }

  private addExperienceField(): void {
    const experienceItem = document.createElement("div");
    experienceItem.className = "experience-item";
    experienceItem.innerHTML = `
            <input type="text" placeholder="Job Title" required>
            <input type="text" placeholder="Company" required>
            <input type="text" placeholder="Start Date" required>
            <input type="text" placeholder="End Date" required>
            <textarea placeholder="Description" rows="3" required></textarea>
            <button type="button" onclick="this.parentElement.remove()">Remove</button>
        `;
    this.experienceList.appendChild(experienceItem);
  }

  private addEducationField(): void {
    const educationItem = document.createElement("div");
    educationItem.className = "education-item";
    educationItem.innerHTML = `
            <input type="text" placeholder="Degree" required>
            <input type="text" placeholder="School" required>
            <input type="text" placeholder="Graduation Date" required>
            <button type="button" onclick="this.parentElement.remove()">Remove</button>
        `;
    this.educationList.appendChild(educationItem);
  }

  private async collectFormData(): Promise<void> {
    this.resume.personalInfo = {
      fullName: (document.getElementById("fullName") as HTMLInputElement).value,
      email: (document.getElementById("email") as HTMLInputElement).value,
      phone: (document.getElementById("phone") as HTMLInputElement).value,
      location: (document.getElementById("location") as HTMLInputElement).value,
    };

    this.resume.summary = (
      document.getElementById("summary") as HTMLTextAreaElement
    ).value;

    this.resume.experience = Array.from(
      this.experienceList.getElementsByClassName("experience-item")
    ).map((item) => ({
      title: (
        item.querySelector('input[placeholder="Job Title"]') as HTMLInputElement
      ).value,
      company: (
        item.querySelector('input[placeholder="Company"]') as HTMLInputElement
      ).value,
      startDate: (
        item.querySelector(
          'input[placeholder="Start Date"]'
        ) as HTMLInputElement
      ).value,
      endDate: (
        item.querySelector('input[placeholder="End Date"]') as HTMLInputElement
      ).value,
      description: (item.querySelector("textarea") as HTMLTextAreaElement)
        .value,
    }));

    this.resume.education = Array.from(
      this.educationList.getElementsByClassName("education-item")
    ).map((item) => ({
      degree: (
        item.querySelector('input[placeholder="Degree"]') as HTMLInputElement
      ).value,
      school: (
        item.querySelector('input[placeholder="School"]') as HTMLInputElement
      ).value,
      graduationDate: (
        item.querySelector(
          'input[placeholder="Graduation Date"]'
        ) as HTMLInputElement
      ).value,
    }));

    this.resume.skills = (
      document.getElementById("skills") as HTMLTextAreaElement
    ).value
      .split(",")
      .map((skill) => skill.trim());

    this.resume.languages = (
      document.getElementById("languages") as HTMLTextAreaElement
    ).value
      .split(",")
      .map((languages) => languages.trim());
  }

  private generatePreview(): void {
    this.previewSection.innerHTML = `
          <h1>${this.resume.personalInfo.fullName}</h1>
          <div class="contact-info">
              <p>${this.resume.personalInfo.email} | ${
      this.resume.personalInfo.phone
    }</p>
              <p>${this.resume.personalInfo.location}</p>
          </div>

          <div class="section">
              <h3>Professional Summary</h3>
              <p>${this.resume.summary}</p>
          </div>

          <div class="section">
              <h3>Experience</h3>
              ${this.resume.experience
                .map(
                  (exp) => `
                  <div class="experience-item">
                      <h4>${exp.title} at ${exp.company}</h4>
                      <p>${exp.startDate} - ${exp.endDate}</p>
                      <p>${exp.description}</p>
                  </div>
              `
                )
                .join("")}
          </div>

          <div class="section">
              <h3>Education</h3>
              ${this.resume.education
                .map(
                  (edu) => `
                  <div class="education-item">
                      <h4>${edu.degree}</h4>
                      <p>${edu.school} - ${edu.graduationDate}</p>
                  </div>
              `
                )
                .join("")}
          </div>

          <div class="section">
              <h3>Skills</h3>
            ${this.resume.skills.map((skill) => `<p>${skill}</p>`).join("")}
          </div>

          <div class="section">
               <h3>Languages</h3>
            ${this.resume.languages
              .map((languages) => `<p>${languages}</p>`)
              .join("")}
          </di
          `;
  }
  private handleSubmit(e: Event): void {
    e.preventDefault();
    this.collectFormData();
    this.generatePreview();
  }
}

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  new ResumeBuilder();
});
