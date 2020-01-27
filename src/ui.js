export default function({ onGenerate }) {
    const alertWindow = COSAlertWindow.new();
    const extendedInputField = NSTextField.alloc().initWithFrame(NSMakeRect(0, 0, 240, 280));
    extendedInputField.stringValue = `{ 
    reds: [
        { 
            codeName: 'R100', 
            name: 'Blood',
            hex: 'cc0000'
        }
    ],
    greens: [
        { 
            codeName: 'G100', 
            name: 'Grass',
            hex: '25BA6F'
        }
    ],
}
    `;
    alertWindow.addAccessoryView(extendedInputField);
    // alertWindow.addAccessoryView(checkbox);
    alertWindow.setMessageText('Generate Color Theme');
    alertWindow.setInformativeText('Please paste in some JSON.');
    alertWindow.addButtonWithTitle('Generate');
    alertWindow.addButtonWithTitle('Cancel');
    const alert = alertWindow.runModal();

    if (alert == NSAlertFirstButtonReturn) {
        onGenerate();
    }
}
