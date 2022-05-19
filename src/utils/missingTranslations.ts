// import previous from 'locales/en/_previous.json';

let globalPrevious: any = undefined;

export const findAndSaveMissingTranslation = (namespace: string, field: string) => {
    // eslint-disable-next-line no-process-env
    const previous =
        globalPrevious ??
        // eslint-disable-next-line no-process-env
        // eslint-disable-next-line no-restricted-globals
        fetch(`${location.origin}${process.env.PUBLIC_URL}/locales/en/_previous.json`).then((data: any) => JSON.parse(data)
        );
    if (!globalPrevious) {
        globalPrevious = previous;
    }
    const allPrevious: any = previous;
    const result = allPrevious[field];
    saveToLocal(`${namespace}:${field}`, field, result);
};

export const saveToLocal = (propertyName: any, label: string, translation?: string) => {
    if (typeof propertyName !== 'string') return;

    const namespaceAndField = propertyName?.split(':');
    let field, namespace;
    if (namespaceAndField.length === 2) {
        namespace = namespaceAndField[0];
        field = namespaceAndField[1];
    }
    else {
        namespace = 'common';
        field = propertyName;
    }

    if (!localStorage) return; // For test contexte

    const storage = localStorage.getItem(namespace);
    let currentValue: any = storage ? JSON.parse(storage) : {};
    if (translation) currentValue[field] = translation;
    else currentValue[field] = label;
    localStorage.setItem(namespace, JSON.stringify(currentValue));
};
