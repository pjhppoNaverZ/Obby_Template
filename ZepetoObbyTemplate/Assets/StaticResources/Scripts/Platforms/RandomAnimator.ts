import { Animator, Mathf, Random } from 'UnityEngine'
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

export default class RandomAnimator extends ZepetoScriptBehaviour {

    private anims : Animator[];

    Start() {

        this.anims = this.gameObject.GetComponentsInChildren<Animator>();
        this.anims.forEach(e => {

            const randomCycleOffset = Random.Range(0, 4);
            const stateInfo = e.GetCurrentAnimatorStateInfo(0);
            e.Play(stateInfo.shortNameHash, -1, randomCycleOffset);
        });

    }

}