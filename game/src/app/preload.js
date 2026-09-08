export function preloadImages(paths) {
    return Promise.all(
        paths.map(
            (src) =>
                new Promise((resolve) => {
                    const img = new window.Image();
                    img.onload = resolve;
                    img.onerror = resolve;
                    img.src = src;
                })
        )
    );
}

export function preloadAudios(paths) {
    return Promise.all(
        paths.map(
            (src) =>
                new Promise((resolve) => {
                    const audio = new Audio();
                    audio.oncanplaythrough = resolve;
                    audio.onerror = resolve;
                    audio.src = src;
                })
        )
    );
}

function getAllAssetPaths(display) {
    const l1 = display.level1;
    const l2 = display.level2;
    const l4 = display.level4;
    const al = display.all_levels;

    const imagePaths = [
        al.background_image,
        "/image/assets/counter.png",
        "/image/assets/main_menu_bg.jpg",
        "/image/assets/ucr-logo.png",
        "/image/assets/tcu-logo.png",
        ...al.male_customers.map((c) => al.customer_prefix + c),
        ...al.female_customers.map((c) => al.customer_prefix + c),
        ...al.devices.map((d) => al.device_prefix + d),
        ...l1.dialogue.map((d) => l1.device_prefix + d.image),
        ...l4.dialogue.map((d) => al.device_prefix + d.image),
    ];

    const audioPaths = [
        "/audio/611962__cmartins10__press-button.wav",
        "/audio/767856__sunixmuz__sunixmuz-bizarre-place-free-ccby.mp3",
        ...l1.dialogue.flatMap((d) => [
            ...d.audio_male.map((a) => l1.audio_prefix + a),
            ...d.audio_female.map((a) => l1.audio_prefix + a),
        ]),
        ...l2.dialogue.flatMap((d) => [
            ...d.audio_male.map((a) => l2.audio_prefix + a),
            ...d.audio_female.map((a) => l2.audio_prefix + a),
            ...d.answer_audio.map((a) => l2.audio_prefix + a),
        ]),
        ...l4.dialogue.flatMap((d) =>
            d.answer_audio.map((a) => l4.audio_prefix + a)
        ),
        ...[
            ...al.male_correct,
            ...al.male_incorrect,
            ...al.female1_correct,
            ...al.female1_incorrect,
            ...al.female2_correct,
            ...al.female2_incorrect,
        ].map((a) => al.feedback_prefix + a),
    ];

    return { imagePaths, audioPaths };
}

export function preloadAllAssets(display) {
    const { imagePaths, audioPaths } = getAllAssetPaths(display);
    return Promise.all([preloadImages(imagePaths), preloadAudios(audioPaths)]);
}