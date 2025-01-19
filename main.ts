/**
 * Schütteln um ein zufälliges Bild auszusuchen
 */
/**
 * Knopf A um das Bild zu senden
 */
/**
 * Bild empfangen
 */
/**
 * Spiel zurücksetzen
 */
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 99) {
        zurücksetzen()
    } else {
        hand_funk = receivedNumber
    }
})
function zurücksetzen () {
    hand = 0
    hand_funk = -1
    gesendet = 0
}
input.onButtonPressed(Button.A, function () {
    if (gesendet == 0) {
        radio.sendNumber(hand)
        gesendet = 1
    }
})
function anzeigeErgebnis () {
    if (hand == hand_funk) {
        basic.showIcon(IconNames.Asleep)
    } else if (hand == 1 && hand_funk == 3) {
        basic.showIcon(IconNames.Happy)
    } else if (hand == 2 && hand_funk == 1) {
        basic.showIcon(IconNames.Happy)
    } else if (hand == 3 && hand_funk == 2) {
        basic.showIcon(IconNames.Happy)
    } else {
        basic.showIcon(IconNames.Sad)
    }
}
input.onGesture(Gesture.Shake, function () {
    hand = randint(1, 3)
    gesendet = 0
})
function zeigeSSP () {
    if (hand == 1) {
        basic.showLeds(`
            # # . . #
            # # . # .
            . . # . .
            # # . # .
            # # . . #
            `)
    } else if (hand == 2) {
        basic.showLeds(`
            . . . . .
            . # # # .
            # # # # #
            . # # # .
            . . . . .
            `)
    } else if (hand == 3) {
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
let hand = 0
let hand_funk = 0
radio.setGroup(1)
zurücksetzen()
basic.forever(function () {
    if (gesendet == 1 && hand_funk != -1) {
        anzeigeErgebnis()
    } else {
        zeigeSSP()
    }
})
