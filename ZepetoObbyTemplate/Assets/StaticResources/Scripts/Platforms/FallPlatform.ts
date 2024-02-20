import { Collider, Coroutine, Quaternion, Vector3, WaitForSeconds } from "UnityEngine";
import { ZepetoScriptBehaviour } from "ZEPETO.Script";
import WorldState from "../Managers/WorldState";

export default class FallPlatform extends ZepetoScriptBehaviour {

  public fallDelay: number = 1; // Time it takes to start falling
  public respawnDelay: number = 3; // Time it takes to respawn

  private _falling: boolean; // Check it is falling
  private _initPos: Vector3; // Starting position
  private _coFallPlatform: Coroutine;

  // Start is called on the frame when a script is enabled just before any of the Update methods is called the first time
  Start() {
    // We save the initial position of the platform
    this._initPos = this.transform.position;
  }

  // If the platform detects the collision with the player, it calls the method to fall
  // https://docs.unity3d.com/ScriptReference/Collider.OnTriggerEnter.html
  OnTriggerEnter(collider: Collider) {
    // Check if the "zepetoCharacter" of the GameSettings instance is null or if the gameobject of the collider is not him and return
    if (WorldState.Instance.zepetoCharacter == null || collider.gameObject != WorldState.Instance.zepetoCharacter.gameObject)
      return;

    // Check if the internal variable "_falling" is false
    if (!this._falling && this._coFallPlatform == null) {
      // Set the internal variable "_falling" on true
      this._falling = true;

      this._coFallPlatform = this.StartCoroutine(this.CoFallPlatform());
      this.StartCoroutine(this.CoRespawnPlatform());

      // DEV NOTE: 
      // Using an Invoke instead of a direct call, allows us to add a delay for its execution
    }

  }

  // This method causes the platform to start falling
  *CoFallPlatform() {

    yield new WaitForSeconds(this.fallDelay);

    while (this._falling) {
      this.transform.Translate(0, -0.5, 0);
      yield null;
    }
  }

  // This method is responsible for returning the platform to its initial state
  *CoRespawnPlatform() {
    yield new WaitForSeconds(this.respawnDelay);

    // We set the flag of is falling on false
    this._falling = false;

    // Set the rotation of the transform to zero
    this.transform.rotation = Quaternion.Euler(0, 0, 0);

    // Set the position into the exact same position at start
    this.transform.position = this._initPos;

    this._coFallPlatform = null;
  }

}