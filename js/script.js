document.addEventListener("DOMContentLoaded", function() {
    const aboutText = "I am a student at SJSU seeking to explore the field of Computer Engineering and Software Design. I have backend design experience and am proficient in several programming languages. I enjoy the outdoors, trading, and gaming in my free time.";
    const aboutElement = document.getElementById("about-text");
    let index = 0;

    function typeWriter() {
        if (index < aboutText.length) {
            aboutElement.innerHTML += aboutText.charAt(index);
            index++;
            setTimeout(typeWriter, 23); // Adjust typing speed by changing the timeout value
        }
    }

    typeWriter();
});
