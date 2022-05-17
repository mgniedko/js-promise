const f = () => {
    console.log("start");

    const asyncFunction = () => {
        console.log("before setTimeout");
        setTimeout(() => {
            console.log("timeout");
        }, 2000);
        console.log("after setTimeout");

        return "Completed";
    };

    const a = asyncFunction();
    console.log("a:" + a);

    console.log("create promise");

    const promise = new Promise((resolve, error) => {
        const res = asyncFunction();
        console.log("async was called");
        resolve(res);
        console.log("resolve was called");
    }).then((res) => setTimeout(() => console.log("then1:" + res), 2000));

    console.log("!");

    promise.then((res) => {
        console.log("then2:" + res);
    });

    console.log("finish");

}

f();