/**
 * Knopf A um das Bild zu senden
 */
/**
 * Bild empfangen
 */
// Spiel zurücksetzen
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 99) {
        zurücksetzen()
    } else {
        hand_gegner = receivedNumber
    }
})
function zurücksetzen () {
    mein_eigen = 0
    hand_gegner = -1
    gesendet = 0
}
input.onButtonPressed(Button.A, function () {
    if (gesendet == 0) {
        radio.sendNumber(mein_eigen)
        gesendet = 1
    }
})
function anzeigeErgebnis () {
    if (mein_eigen == hand_gegner) {
        basic.showIcon(IconNames.Asleep)
    } else if (mein_eigen == 1 && hand_gegner == 3) {
        basic.showIcon(IconNames.Happy)
    } else if (mein_eigen == 2 && hand_gegner == 1) {
        basic.showIcon(IconNames.Happy)
    } else if (mein_eigen == 3 && hand_gegner == 2) {
        basic.showIcon(IconNames.Happy)
    } else {
        basic.showIcon(IconNames.Sad)
    }
}
/**
 * Schütteln um ein zufälliges Bild auszusuchen
 */
input.onGesture(Gesture.Shake, function () {
    mein_eigen = randint(1, 3)
    gesendet = 0
})
function zeigeSSP () {
    if (mein_eigen == 1) {
        basic.showLeds(`
            # # . . #
            # # . # .
            . . # . .
            # # . # .
            # # . . #
            `)
    } else if (mein_eigen == 2) {
        basic.showLeds(`
            . . . . .
            . # # # .
            # # # # #
            . # # # .
            . . . . .
            `)
    } else if (mein_eigen == 3) {
        basic.showLeds(`
            # # # # #
            # . . . #
            # . . . #
            # . . . #
            # # # # #
            `)
    } else {
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            `)
    }
}
input.onButtonPressed(Button.AB, function () {
    zurücksetzen()
    radio.sendNumber(99)
})
let gesendet = 0
let mein_eigen = 0
let hand_gegner = 0
radio.setGroup(1)
zurücksetzen()
basic.forever(function () {
    if (gesendet == 1 && hand_gegner != -1) {
        anzeigeErgebnis()
    } else {
        zeigeSSP()
    }
})
