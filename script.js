// const GEMINI_API_KEY = "AIzaSyAda16zfotKFE3xS0imLK18BrO4M5gWWf8"
// const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`



// const GEMINI_API_KEY = "AIzaSyAda16zfotKFE3xS0imLK18BrO4M5gWWf8";
// const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

// document.addEventListener("DOMContentLoaded", function () {

//     document.getElementById("click").addEventListener("click", function () {
//         let section = document.getElementById("resumee");
//         section.style.display = section.style.display === "none" || section.style.display === "" ? "block" : "none";
//         function getValue(id) {
//             const element = document.getElementById(id);
//             return element ? element.value : "N/A";
//         }
//     });
//     function showSelectedSkills() {
//         const userData = {
//             name: getValue('name'),
//             rem: getValue('rem'),
//             workExperience: getValue('workExperience'),
//             degree: getValue('degree'),
//             jobTitle: getValue('jobTitle'),
//             company: getValue('company'),
//             roleExcitement: getValue('roleExcitement'),
//             projects: getValue('projects'),
//             careerGoals: getValue('careerGoals'),
//             skills: getValue('skills'),
//             otherInfo: getValue('otherInfo')
//         };

//         if (!userData.name || !userData.degree || !userData.jobTitle || !userData.company || !userData.skills) {
//             alert("Please fill all the required fields to generate the resume!");
//             return;
//         }

//         localStorage.setItem("resumeData", JSON.stringify(userData));
//         console.log("User Data Saved:", userData);
//         displayUserData(userData);
//     }

//     document.getElementById("submitBtn")?.addEventListener("click", showSelectedSkills);
//     function displayUserData(data) {
//         document.getElementById("output").innerHTML = `
//             <p><strong>Name:</strong> ${data.name}</p>
           
//             <p><strong>Other Info:</strong> ${data.otherInfo}</p>
//             <p><strong>Project Links:</strong> ${data.projects}</p>
//         `;
//     }

//     async function generateCoverLetter() {
//         const savedData = JSON.parse(localStorage.getItem("resumeData") || "{}");

//         if (!savedData.name) {
//             alert("first submit the form!");
//             return;
//         }

//         try {
//             let response = await fetch(API_URL, {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({
//                     contents: [{
//                         parts: [{
//                             text: ` Write a professional cover letter for a
//                                    <h2> ${data.name} ${data.rem}</h2>
//                                    <p><strong>Job Title:</strong> ${data.jobTitle}</p> ${savedData.jobTitle} 
//                                    <p><strong>Conpany Name:</strong> ${data.company}</p> at ${savedData.company}. 
//                                    <p><strong>Degree:</strong> ${data.degree}</p> The applicant has a ${savedData.degree}
//                                    degree and ${savedData.workExperience} of experience.
//                                    Skills include: ${savedData.skills}. 
//                                    <p><strong>Role Excitement:</strong> ${data.roleExcitement}</p> Excited about the role because: ${savedData.roleExcitement}.

//                                    <p><strong>Project Links:</strong> ${data.projects}</p> Past projects: ${savedData.projects}. 
//                                    <p><strong>CareerGoals:</strong> ${data.careerGoals}</p> Career Goals: ${savedData.careerGoals}.
//                                     <p><strong>Other Info:</strong> ${data.otherInfo}</p> Additional info: ${savedData.otherInfo}`
//                         }]
//                     }]
//                 })
//             })

//             let data = await response.json();
//             console.log("API Response:", data);

//             let coverLetterText = data?.candidates?.[0]?.content?.parts?.map(part => part.text).join("\n") || "API response error!";

//             document.getElementById('output').innerHTML += `<p><strong>Generated Cover Letter:</strong> ${coverLetterText}</p>`;

//         } catch (error) {
//             console.error("API Error:", error);
//             alert("error!");
//         }
//     }

//     const savedData = localStorage.getItem("resumeData");
//     if (savedData) displayUserData(JSON.parse(savedData));

//     function getValue(id) {
//         return document.getElementById(id)?.value || "N/A";
//     }

//     window.showSelectedSkills = showSelectedSkills;
//     window.generateCoverLetter = generateCoverLetter;
// });


// function about() {
//     const about = document.getElementById('about')
// }









const GEMINI_API_KEY = "AIzaSyAda16zfotKFE3xS0imLK18BrO4M5gWWf8";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

document.addEventListener("DOMContentLoaded", function () {
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

    async function analyzeData(myfeelings) {
        try {
            let response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: `${myfeelings}! Based on the above text, could you provide my feelings in one word: Positive, Negative, or Neutral?` }] }]
                })
            });

            let data = await response.json();
            let sentiment = data?.candidates?.[0]?.content?.parts?.map(part => part.text).join(" ") || "Neutral";
            console.log("Sentiment Analysis Result:", sentiment);
            return sentiment;
        } catch (error) {
            console.error("Sentiment API Error:", error);
            return "Neutral";
        }
    }

    async function generateCoverLetter() {
        const savedData = JSON.parse(localStorage.getItem("resumeData") || "{}");

        if (!savedData.name) {
            alert("First submit the form!");
            return;
        }

        let sentiment = await analyzeData(savedData.roleExcitement);

        try {
            let response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: `Dear Hiring Manager,

I am writing to express my interest in the ${savedData.jobTitle} position at ${savedData.company}. With a ${savedData.degree} degree and ${savedData.workExperience} of experience, I have developed expertise in ${savedData.skills}. My past projects, such as ${savedData.projects}, have enhanced my problem-solving skills and ability to work in dynamic environments.

What excites me most about this role is ${savedData.roleExcitement}, and I am eager to bring my knowledge and dedication to your team. My career goals align with the company's vision, and I believe my skills will be an asset to your organization.

Additional information about me: ${savedData.otherInfo}.

Thank you for considering my application. I look forward to the opportunity to discuss how my background, skills, and enthusiasm can contribute to your team.

Best regards,  
${savedData.name}  
(${sentiment} Sentiment)`
                        }]
                    }]
                })
            });

            let data = await response.json();
            console.log("API Response:", data);

            let coverLetterText = data?.candidates?.[0]?.content?.parts?.map(part => part.text).join("\n") || "API response error!";

            document.getElementById('output').innerHTML = `
                <div class="cover-letter">
                    <h3>Generated Cover Letter</h3>
                    <pre>${coverLetterText}</pre>
                </div>
            `;

            document.getElementById("output").style.display = "block";

        } catch (error) {
            console.error("API Error:", error);
            alert("Error generating cover letter!");
        }
    }

    if (localStorage.getItem("resumeData")) {
        showSelectedSkills();
    }

    window.showSelectedSkills = showSelectedSkills;
    window.generateCoverLetter = generateCoverLetter;
});
