
const GEMINI_API_KEY = "AIzaSyAda16zfotKFE3xS0imLK18BrO4M5gWWf8";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

document.addEventListener("DOMContentLoaded", function () {
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;
    
    document.getElementById("click").addEventListener("click", function () {
        let section = document.getElementById("resumee");
        section.style.display = section.style.display === "none" || section.style.display === "" ? "block" : "none";
    });
    
    function getValue(id) {
        return document.getElementById(id)?.value || "N/A";
    }
    
    function showSelectedSkills() {
        const userData = {
            name: getValue('name'),
            rem: getValue('rem'),
            workExperience: getValue('workExperience'),
            degree: getValue('degree'),
            jobTitle: getValue('jobTitle'),
            company: getValue('company'),
            roleExcitement: getValue('roleExcitement'),
            projects: getValue('projects'),
            careerGoals: getValue('careerGoals'),
            skills: getValue('skills'),
            otherInfo: getValue('otherInfo')
        };
        
        if (!userData.name || !userData.degree || !userData.jobTitle || !userData.company || !userData.skills) {
            alert("Please fill all the required fields to generate the resume!");
            return;
        }

        localStorage.setItem("resumeData", JSON.stringify(userData));
        console.log("User Data Saved:", userData);
    }
    
    document.getElementById("submitBtn")?.addEventListener("click", showSelectedSkills);
    
    async function generateCoverLetter() {
        const savedData = JSON.parse(localStorage.getItem("resumeData") || "{}");
        
        try {
            let response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: `Dear Hiring Manager,\n\nI am writing to express my interest in the ${savedData.jobTitle} position at ${savedData.company}. With a ${savedData.degree} degree and ${savedData.workExperience} of experience, I have developed expertise in ${savedData.skills}. My past projects, such as ${savedData.projects}, have enhanced my problem-solving skills and ability to work in dynamic environments.\n\nWhat excites me most about this role is ${savedData.roleExcitement}, and I am eager to bring my knowledge and dedication to your team. My career goals align with the company's vision, and I believe my skills will be an asset to your organization.\n\nAdditional information about me: ${savedData.otherInfo}.\n\nThank you for considering my application.\n\nBest regards,\n${savedData.name}`
                        }]
                    }]
                })
            });
            let data = await response.json();
            let coverLetterText = data?.candidates?.[0]?.content?.parts?.map(part => part.text).join("\n") || "API response error!";
            
            document.getElementById('output').innerHTML = `
                <div class="cover-letter">
                    <h3>Generated Cover Letter</h3>
                    <pre>${coverLetterText}</pre>
                    <button id="saveBtn">Save to Local Storage</button>
                </div>
            `;
            
            document.getElementById("output").style.display = "block";
            
            document.getElementById("saveBtn").addEventListener("click", function () {
                localStorage.setItem("coverLetter", coverLetterText);
                alert("Cover letter saved to Local Storage!");
            });
        } catch (error) {
            console.error("API Error:", error);
            alert("Error generating cover letter!");
        }
    }
    
    window.showSelectedSkills = showSelectedSkills;
    window.generateCoverLetter = generateCoverLetter;
});
