import { Collider } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import WorldState from '../Managers/WorldState';
import ObbyWorldManager from '../Managers/ObbyWorldManager';

export default class TrapPlatform extends ZepetoScriptBehaviour {

     // https://docs.unity3d.com/ScriptReference/Collider.OnTriggerEnter.html
     OnTriggerEnter ( collider: Collider ) 
     {        
         // Check if the "zepetoCharacter" of the GameSettings instance is null or if the gameobject of the collider is not him and return
         // If so, return the function
         if ( WorldState.Instance.zepetoCharacter == null || collider.gameObject != WorldState.Instance.zepetoCharacter.gameObject )
             return;
 
         // Call to the internal function "TPPlayer"
         this.TPPlayer();
     }
 
     // This method teleport the player
     TPPlayer () 
     {
         // Call to the "TeleportCharacter" function of the ObbyGameManager instance
         ObbyWorldManager.instance.TeleportCharacter();
     }
}