import { BoxCollider, Collider, Quaternion, Rigidbody, Vector3 } from "UnityEngine";
import { ZepetoScriptBehaviour } from "ZEPETO.Script";
import GameSettings from '../Game Settings/GameSettings';


export default class FallPlatform extends ZepetoScriptBehaviour 
{
  public fallDelay: number = 0.1; //Time it takes to start falling
  public respawnDelay: number = 5; //Time it takes to respawn

  private _falling: boolean; //Check it is falling
  private _initPosY: number; //Starting Y position

  private _myRigidbody: Rigidbody; //Rigidbody Reference
  private _myCollider: BoxCollider; //BoxCollider Reference

  Awake () {
    //Get the Collider reference on this GameObject
    this._myCollider = this.gameObject.GetComponent<BoxCollider>();

    //Get the Rigidbody reference on this GameObject
    this._myRigidbody = this.gameObject.GetComponent<Rigidbody>();
  }

  Start () {
    if ( this.transform.childCount > 0 )
    {
      let child: BoxCollider = this.transform
        .GetChild( 0 )
        .GetComponent<BoxCollider>(); //Get Collider on the child
      this._myCollider.center = new Vector3(
        child.center.x,
        0.5,
        child.center.z
      ); //Rebuild Center of this collider
      this._myCollider.size = new Vector3(
        child.transform.localScale.x * child.size.x,
        1,
        child.transform.localScale.z * child.size.z
      ); //Rebuild Size of this collider
      this._myCollider.isTrigger = true; //Set it Trigger
    }

    //Set init pos
    this._initPosY = this.transform.position.y;
  }

  OnTriggerEnter ( collider: Collider ) {
    if (
      GameSettings.Instance.zepetoCharacter == null ||
      collider.gameObject != GameSettings.Instance.zepetoCharacter.gameObject
    )
      return;

    if ( !this._falling )
    {
      //Start falling
      this._falling = true;
      this.Invoke( "FallPlatform", this.fallDelay );
    }
  }

  FallPlatform () {
    this._myRigidbody.isKinematic = false;
    this._myRigidbody.useGravity = true;

    //Start respawning
    this.Invoke( "RespawnPlatform", this.respawnDelay );
  }

  RespawnPlatform () {
    this._falling = false;

    this._myRigidbody.isKinematic = true;
    this._myRigidbody.useGravity = false;

    this.transform.rotation = Quaternion.Euler( 0, 0, 0 );
    this.transform.position = new Vector3(
      this.transform.position.x,
      this._initPosY,
      this.transform.position.z
    );
  }
}