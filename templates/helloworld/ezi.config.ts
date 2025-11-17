import { defineConfig } from "@eziapp-org/bridge";

export default defineConfig({
    application: {
        name: "helloworld",
        package: "com.ezi.app.helloworld",
        icon: "image/ezi-logo.png",
    },
    window: {
        title: "HelloWorld",
        backgroundMode: "mica",
        splashscreen: {
            src: "image/ezi-logo.png",
        },
    },
});
