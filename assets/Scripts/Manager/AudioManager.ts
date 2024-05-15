const { ccclass } = cc._decorator;

@ccclass
export default class AudioManager extends cc.Component {
    private audioClip: cc.AudioClip = null;
    private audioSource: cc.AudioSource = null;

    onLoad() {
        // Get the AudioSource component attached to this node
        this.audioSource = this.getComponent(cc.AudioSource);
    }

    loadClip(audioPath: string, callback?: Function) {
        cc.loader.loadRes(audioPath, cc.AudioClip, (err, clip) => {
            if (err) {
                cc.error(err.message || err);
                return;
            }
            this.audioClip = clip;
            if (callback) {
                callback();
            }
        });
    }

    playClip() {
        console.log("play Clip");
        if (this.audioClip && this.audioSource) {
            // Assign the loaded audio clip to the AudioSource component
            this.audioSource.clip = this.audioClip;
            // Play the audio
            this.audioSource.play();
            console.log("play Clip done");

        } else {
            cc.warn("No audio clip loaded or AudioSource component attached.");
        }
    }
}
