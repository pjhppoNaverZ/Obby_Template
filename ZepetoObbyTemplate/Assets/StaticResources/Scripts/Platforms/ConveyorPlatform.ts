import { Collider, Vector3 } from 'UnityEngine';
import { ZepetoCharacter, ZepetoPlayer } from 'ZEPETO.Character.Controller';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

export default class ConveyorPlatform extends ZepetoScriptBehaviour {
    private _force: number = 2;

    // Unity calls this function on a trigger collider once per frame if it detects another Collider inside the trigger collider.
    OnTriggerStay(coll: Collider) {
        console.log("Stay");
        // Obtain the ZepetoCharacter component from the collider that activates the trigger
        let _player = coll.GetComponent<ZepetoCharacter>();

        // Check if the variable "_player" is not null
        if (_player) {

            
            // // Get the player controller from the collider
            // let zepetoCharacter: ZepetoCharacter = coll.gameObject.GetComponent<ZepetoCharacter>();

            // // // Push the player forwards of the conveyor
            // zepetoCharacter.characterController.SimpleMove(this.transform.forward);

            // // // Set the additional walk and run speed to the force of the conveyor
            // zepetoCharacter.additionalWalkSpeed = -this._force;
            // zepetoCharacter.additionalRunSpeed = -this._force;

        }

    }

    // Unity calls this function on a trigger collider when it ceases contact with another collider.
    OnTriggerExit(coll: Collider) {

        // // Check if the colliding object has the tag player
        // if (coll.CompareTag("Player")) {
           
        //     // Get the player controller from the collider
        //     let zepetoCharacter: ZepetoCharacter = coll.gameObject.GetComponent<ZepetoCharacter>();
            
        //     // // Set the additional walk and run speed to 0
        //     zepetoCharacter.additionalWalkSpeed = 0;            
        //     zepetoCharacter.additionalRunSpeed = 0;
        // }
    }
}