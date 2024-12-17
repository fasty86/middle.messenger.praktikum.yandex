export default class {
    constructor(protected root: HTMLElement) {
        this.root = root;
    }

    protected setTitle(title: string) {
        document.title = title;
    }
    async render() {}
    closeModalOutside(dialog: HTMLDialogElement) {
        dialog.addEventListener("click", function (event) {
            const rect = dialog.getBoundingClientRect();
            const isInDialog =
                rect.top <= event.clientY &&
                event.clientY <= rect.top + rect.height &&
                rect.left <= event.clientX &&
                event.clientX <= rect.left + rect.width;
            if (!isInDialog) {
                dialog.close();
            }
        });
    }
    protected buildComponents() {}
    protected addEvtListeners() {}
}
