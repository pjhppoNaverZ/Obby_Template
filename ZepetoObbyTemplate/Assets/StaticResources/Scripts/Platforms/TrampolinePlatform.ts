import { Collider, Coroutine } from 'UnityEngine';
import { ZepetoCharacter } from 'ZEPETO.Character.Controller';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

export default class TrampolinePlatform extends ZepetoScriptBehaviour {

    // This variable saves the jump force
    private _jumpForce: number = 10;

    private _isJump: bool = false;
    private _coJump: Coroutine;


    OnTriggerEnter(collider: Collider) {
        console.log("Enter");

        // Obtain the ZepetoCharacter component from the collider that activates the trigger
        let _player = collider.GetComponent<ZepetoCharacter>();

        // Check if the variable "_player" is not null
        if (_player) {

            console.log("Jump");
            this._isJump = true;
            this._coJump = this.StartCoroutine(this.CoJump(_player));
        }
    }

    *CoJump(_player: ZepetoCharacter) {

        _player.additionalJumpPower = this._jumpForce;

        // Make the character jump
        while (this._isJump) {
            _player.Jump();
            yield null;
        }
    }


    // Unity calls this function on a trigger collider when it ceases contact with another collider.
    OnTriggerExit(collider: Collider) {

        // Obtain the ZepetoCharacter component from the collider that activates the trigger
        let _player = collider.GetComponent<ZepetoCharacter>();

        // Check if the variable "_player" is not null
        if (_player) {

            console.log("Exit");

            this._isJump = false;

            _player.additionalJumpPower = 0;
            this.StartCoroutine(this.CoJump(_player));

        }
    }
}