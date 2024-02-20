import { GameObject } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

// This class controls all the UI process of the game
export default class UIManager extends ZepetoScriptBehaviour {
    public static Instance: UIManager; // Singleton instance variable

    @SerializeField() _resultPanel: GameObject; // Victory panel reference

    // Awake is called when the script instance is being loaded
    Awake() {
        // This is how the instance of this class is allocated. Which makes it a "singleton"
        // Singleton https://en.wikipedia.org/wiki/Singleton_pattern
        if (UIManager.Instance != null) GameObject.Destroy(this.gameObject);
        UIManager.Instance = this;
    }

    // This method is called when start
    OnStart() {
        // We deactivate  the gameobject "_victoryPanel"
        this._resultPanel.SetActive(false);
    }

    // This method is called when the player wins
    OnVictory(): void {
        // We activate the gameobject "_victoryPanel"
        this._resultPanel.SetActive(true);
    }

}