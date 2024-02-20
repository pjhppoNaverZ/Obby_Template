import { Collider } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import WorldState from "../Managers/WorldState";
import ObbyWorldManager from '../Managers/ObbyWorldManager';

// This class controls the spawnpoints
export default class SpawnPlatform extends ZepetoScriptBehaviour {
    private _activeCheckpoint: bool = false; // Internal flag to set if the spawnpoint was actived

    // https://docs.unity3d.com/ScriptReference/Collider.OnTriggerEnter.html
    // When the player touches the spawn it got setted active and update the last checkpoint
    OnTriggerEnter(collider: Collider) {
        // Check if the "zepetoCharacter" of the GameSettings instance is null or if the gameobject of the collider is not him and return
        if (WorldState.Instance.zepetoCharacter == null || collider.gameObject != WorldState.Instance.zepetoCharacter.gameObject)
            return;

        // Check if the flag is false
        if (!this._activeCheckpoint) {
            // Set the flag on true
            this._activeCheckpoint = true;

            // Call to the UpdateCheckpoint method of the "ObbyGameManager" instance passing this "SpawnPoint" like reference
            ObbyWorldManager.instance.UpdateCheckpoint(this);
        }
    }
}