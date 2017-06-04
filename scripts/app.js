"use strict";

$(function() {

    var countFilledFields = 0,
        isPlayerWon = false,
        isComputerWon = false,
        isPlaying = true,
        filledFields = [],
        arrayOfFieldIds = ["field_one", "field_two", "field_three",
                           "field_four", "field_five", "field_six",
                           "field_seven", "field_eight", "field_nine"];

    function getRandomNumber() {

        var randomNumber,
            isUnavailableNumber = true;

        while (isUnavailableNumber) {
            randomNumber = Math.floor(Math.random() * 9) + 1;

            isUnavailableNumber = false;

            for (var i = 0; i < filledFields.length; i++) {
                if (filledFields[i] === randomNumber) {
                    isUnavailableNumber = true;
                    break;
                }
            }
        }

        return randomNumber;
    }

    function getFieldNumberFromId(id) {

        var fieldNumber;

        switch(id) {
            case arrayOfFieldIds[0]: fieldNumber = 1; break;
            case arrayOfFieldIds[1]: fieldNumber = 2; break;
            case arrayOfFieldIds[2]: fieldNumber = 3; break;
            case arrayOfFieldIds[3]: fieldNumber = 4; break;
            case arrayOfFieldIds[4]: fieldNumber = 5; break;
            case arrayOfFieldIds[5]: fieldNumber = 6; break;
            case arrayOfFieldIds[6]: fieldNumber = 7; break;
            case arrayOfFieldIds[7]: fieldNumber = 8; break;
            case arrayOfFieldIds[8]: fieldNumber = 9; break;
        }

        return fieldNumber;
    }

    function getIdFromNumber(randomNumber) {

        var id;
        
        switch(randomNumber) {
            case 1: id = arrayOfFieldIds[0]; break;
            case 2: id = arrayOfFieldIds[1]; break;
            case 3: id = arrayOfFieldIds[2]; break;
            case 4: id = arrayOfFieldIds[3]; break;
            case 5: id = arrayOfFieldIds[4]; break;
            case 6: id = arrayOfFieldIds[5]; break;
            case 7: id = arrayOfFieldIds[6]; break;
            case 8: id = arrayOfFieldIds[7]; break;
            case 9: id = arrayOfFieldIds[8]; break;
        }

        return id;
    }

    function checkSecondDiag() {

        var valueOne = $('#' + arrayOfFieldIds[6]).children().text(),
            valueTwo = $('#' + arrayOfFieldIds[4]).children().text(),
            valueThree = $('#' + arrayOfFieldIds[2]).children().text();

        if (valueOne === valueTwo && valueTwo === valueThree) {
            if (valueOne === 'X') {
                isPlayerWon = true;
                isPlaying = false;
            } else if (valueOne === 'O') {
                isComputerWon = true;
                isPlaying = false;
            }
        }
    }

    function checkMainDiag() {

        var valueOne = $('#' + arrayOfFieldIds[0]).children().text(),
            valueTwo = $('#' + arrayOfFieldIds[4]).children().text(),
            valueThree = $('#' + arrayOfFieldIds[8]).children().text();

        if (valueOne === valueTwo && valueTwo === valueThree) {
            if (valueOne === 'X') {
                isPlayerWon = true;
                isPlaying = false;
            } else if (valueOne === 'O') {
                isComputerWon = true;
                isPlaying = false;
            }
        }
    }

    function checkFieldsVer() {

        for (var i = 0; i < 3; i++) {
            var valueOne = $('#' + arrayOfFieldIds[i]).children().text(),
                valueTwo = $('#' + arrayOfFieldIds[i + 3]).children().text(),
                valueThree = $('#' + arrayOfFieldIds[i + 6]).children().text();

            if (valueOne === valueTwo && valueTwo === valueThree) {
                if (valueOne === 'X') {
                    isPlayerWon = true;
                    isPlaying = false;
                } else if (valueOne === 'O') {
                    isComputerWon = true;
                    isPlaying = false;
                }
            }
        }
    }

    function checkFieldsHor() {

        for (var i = 0; i < arrayOfFieldIds.length; i += 3) {
            var valueOne = $('#' + arrayOfFieldIds[i]).children().text(),
                valueTwo = $('#' + arrayOfFieldIds[i + 1]).children().text(),
                valueThree = $('#' + arrayOfFieldIds[i + 2]).children().text();
            
            if (valueOne === valueTwo && valueTwo === valueThree) {
                if (valueOne === 'X') {
                    isPlayerWon = true;
                    isPlaying = false;
                } else if (valueOne === 'O') {
                    isComputerWon = true;
                    isPlaying = false;
                }
            }
        }
    }

    function checkIsGameOver() {

        checkMainDiag();
        checkSecondDiag();
        checkFieldsHor();
        checkFieldsVer();

        if (countFilledFields >= 9 || !isPlaying) {
            if (isPlayerWon) {
                $('#result').text("You win!");
            } else if (isComputerWon) {
                $('#result').text("You lose!");
            } else {
                $('#result').text("It's draw!");
            }
        
            var resetButton = $('<input id="reset_button" type="button" value="Play again" onclick="javascript:window.location.reload();">');
            $('#reset_button_div').append(resetButton);

            isPlaying = false;
        }
    }

    function addPlayerValue(playerFieldId) {

        var playerFieldNumber = getFieldNumberFromId(playerFieldId);

        $('#' + playerFieldId).children().text("X");

        countFilledFields += 1;
        checkIsGameOver();
        filledFields.push(playerFieldNumber);
    }

    function addComputerValue() {
        
        var computerFieldNumber = getRandomNumber(),
            computerFieldId = getIdFromNumber(computerFieldNumber);

        $('#' + computerFieldId).children().text("O");

        countFilledFields += 1;
        checkIsGameOver();
        filledFields.push(computerFieldNumber);
    }

    function addValuesToFields(playerFieldId) {

        var fieldValue = $('#' + playerFieldId).children().text();

        if (fieldValue === '') {
            addPlayerValue(playerFieldId);

            if (countFilledFields < 9 && isPlaying) {
                addComputerValue();
            }
        }
    }

    $('#field_one, #field_two, #field_three, #field_four, #field_five, #field_six, #field_seven, #field_eight, #field_nine').click(function() {
        if (isPlaying) {
            addValuesToFields(this.id);
        }
    });
});