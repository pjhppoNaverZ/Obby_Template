import { Animator, Collider } from 'UnityEngine';
import { ZepetoCharacter } from 'ZEPETO.Character.Controller';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

export default class StaticPlatform extends ZepetoScriptBehaviour {

    private anim: Animator;

    Start(){
        this.anim = this.GetComponent<Animator>();
    }
   // https://docs.unity3d.com/ScriptReference/Collider.OnTriggerEnter.html
    // This event is fired when the player reaches the moving platform
    OnTriggerEnter(collider: Collider) {

        // Obtain the ZepetoCharacter component from the collider that activates the trigger
        let _player = collider.GetComponent<ZepetoCharacter>();

        // Check if the variable "_player" is not null
        if (_player) {

            this.anim.SetTrigger("Down");
        }
    }

    // https://docs.unity3d.com/ScriptReference/Collider.OnTriggerExit.html
    // This event is fired when the player leaves the moving platform
    OnTriggerExit(collider: Collider) {

        // Obtain the ZepetoCharacter component from the collider that activates the trigger
        let _player = collider.GetComponent<ZepetoCharacter>();

        // Check if the variable "_player" is not null
        if (_player) {

            this.anim.SetTrigger("Up");
        }
    }

}