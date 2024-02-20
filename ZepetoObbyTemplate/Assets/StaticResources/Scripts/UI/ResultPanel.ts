import { Button } from 'UnityEngine.UI';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import WorldState from '../Managers/WorldState';

// Class that controls the interactions with the victory screen
export default class ResultPanel extends ZepetoScriptBehaviour {
    public resetButton: Button; // Get Reset button reference

    // Start is called on the frame when a script is enabled just before any of the Update methods is called the first time
    Start() {
        // We add a function to "resetButton" when we click on it
        this.resetButton.onClick.AddListener(this.ResetBtnAction);
    }

    // Call to reload the scene
    ResetBtnAction(): void {
        WorldState.Instance.ResetMap();
    }
}