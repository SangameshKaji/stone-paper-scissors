package com.sangamesh.stone_paper_scissors_server.controller;

import com.sangamesh.stone_paper_scissors_server.model.GameMode;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Random;

@RestController
@RequestMapping("/api/game")
@CrossOrigin(origins = "http://localhost:5173")
public class GameController {

    private final Random random = new Random();

    @PostMapping("/play")
    public Map<String, String> play(@RequestBody Map<String, String> request) {
        String playerChoice = request.get("choice");
        GameMode mode = GameMode.valueOf(request.getOrDefault("mode", "NORMAL"));

        String computerChoice = getComputerChoice(playerChoice, mode);
        String winner = getWinner(playerChoice, computerChoice);

        return Map.of(
                "playerChoice", playerChoice,
                "computerChoice", computerChoice,
                "winner", winner
        );
    }

    private String getComputerChoice(String playerChoice, GameMode mode) {
        if (mode == GameMode.PLAYER_FAVORED) {
            return getLosingChoice(playerChoice);
        }

        if (mode == GameMode.COMPUTER_FAVORED) {
            return getWinningChoice(playerChoice);
        }

        String[] choices = {"Rock", "Paper", "Scissors"};
        return choices[random.nextInt(choices.length)];
    }

    private String getLosingChoice(String playerChoice) {
        if (playerChoice.equals("Rock")) {
            return "Scissors";
        }

        if (playerChoice.equals("Paper")) {
            return "Rock";
        }

        return "Paper";
    }

    private String getWinningChoice(String playerChoice) {
        if (playerChoice.equals("Rock")) {
            return "Paper";
        }

        if (playerChoice.equals("Paper")) {
            return "Scissors";
        }

        return "Rock";
    }

    private String getWinner(String playerChoice, String computerChoice) {
        if (playerChoice.equals(computerChoice)) {
            return "Draw";
        }

        if (
            playerChoice.equals("Rock") && computerChoice.equals("Scissors") ||
            playerChoice.equals("Paper") && computerChoice.equals("Rock") ||
            playerChoice.equals("Scissors") && computerChoice.equals("Paper")
        ) {
            return "Player";
        }

        return "Computer";
    }
}