import { GameObject, Object } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { ZepetoPlayers, ZepetoScreenButton, CharacterState } from 'ZEPETO.Character.Controller';

// This class controls all the UI process of the world
export default class UIManager extends ZepetoScriptBehaviour {

    // Singleton instance variable
    public static Instance: UIManager;

    // Result panel reference
    @SerializeField() _resultPanel: GameObject;

    // Awake is called when the script instance is being loaded
    Awake() {

        // This is how the instance of this class is allocated. Which makes it a "singleton"
        // Singleton https://en.wikipedia.org/wiki/Singleton_pattern
        if (UIManager.Instance != null) GameObject.Destroy(this.gameObject);
        UIManager.Instance = this;
    }

    // This method is called when start
    OnStart() {

        // We deactivate  the gameobject "_resultPanel"
        this._resultPanel.SetActive(false);
    }

    // This method is called when the player wins
    OnEndWorld(): void {

        // We activate the gameobject "_resultPanel"
        this._resultPanel.SetActive(true);
    }

    Start() {
        this.SetDoubleJump();
    }

    SetDoubleJump() {

        ZepetoPlayers.instance.OnAddedLocalPlayer.AddListener(() => {

            const zepetoCharacter = ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character;

            const screenButton = Object.FindObjectOfType<ZepetoScreenButton>();

            screenButton.OnPointDownEvent.AddListener(() => {
                if (zepetoCharacter.CurrentState === CharacterState.Jump) {
                    zepetoCharacter.DoubleJump();
                }
            });
        })
    }

}