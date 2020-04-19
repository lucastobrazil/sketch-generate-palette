export default function ({ onGenerate, destination }) {
    const alertWindow = COSAlertWindow.new();
    alertWindow.setMessageText('Please Confirm');
    alertWindow.setInformativeText(
        `CAUTION: This Action will delete all layers and add new swatches to the page with the name ${destination}. Please be sure that you know what you're doing.`
    );
    alertWindow.addButtonWithTitle('Yes, I know What I am doing.');
    alertWindow.addButtonWithTitle('Cancel');
    const alert = alertWindow.runModal();

    if (alert == NSAlertFirstButtonReturn) {
        onGenerate();
    }
}
