package com.email.email_assistant_springboot;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@AllArgsConstructor
public class EmailRequest {

    private String emailContent;
    private String tone;

    // Getters
    public String getEmailContent() {
        return emailContent;
    }

    public String getTone() {
        return tone;
    }

    // Setters
    public void setEmailContent(String emailContent) {
        this.emailContent = emailContent;
    }

    public void setTone(String tone) {
        this.tone = tone;
    }

}
