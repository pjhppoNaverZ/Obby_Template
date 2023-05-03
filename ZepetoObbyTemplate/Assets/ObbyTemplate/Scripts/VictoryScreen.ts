import { TextMeshProUGUI } from 'TMPro';
import { Application, Debug, GameObject } from 'UnityEngine';
import { SceneManager } from 'UnityEngine.SceneManagement';
import { Button } from 'UnityEngine.UI';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import GameSettings from './GameSettings';

export default class VictoryScreen extends ZepetoScriptBehaviour {
    public victoryTittle: string = "Game Over"; //Victory Tittle
    public victorySubtittle: string = ""; //Victory Subtittle, It is not required

    public resetButton: Button; //Get Reset button reference
    public nextLevelButton: Button; //Get Reset button reference
    public tittleTxt: TextMeshProUGUI; //Get tittle reference
    public subtittleTxt: TextMeshProUGUI; //Get Subtittle reference

    OnValidate() {
        this.tittleTxt.text = this.victoryTittle;
        this.subtittleTxt.text = this.victorySubtittle;
    }

    Start() {
        this.tittleTxt.text = this.victoryTittle;
        this.subtittleTxt.text = this.victorySubtittle;

        this.resetButton.onClick.AddListener(this.ResetBtnAction);
        this.nextLevelButton.onClick.AddListener(() => 
        {
            this.NextLevelBtnAction()
        });
    }

    ResetBtnAction(): void {
        SceneManager.LoadScene(SceneManager.GetActiveScene().name);
    }

    NextLevelBtnAction(): void {
        GameSettings.instance.NextLevel();
        GameObject.Destroy(this.gameObject);
    }
}