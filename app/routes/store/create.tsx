import {protectRoute$} from "@/server/actions/auth";
import {checkStoreExists$, createStore$} from "@/server/actions/store";
import {zodResolver} from "@hookform/resolvers/zod";
import {type CreateStoreFormData, createStoreSchema} from "@lib/schema";
import {useUploadThing} from "@lib/utils/uploadthing";
import {useMutation} from "@tanstack/react-query";
import {createFileRoute} from "@tanstack/react-router";
import {useServerFn} from "@tanstack/start";
import {Avatar} from "@ui/avatar";
import {Button} from "@ui/button";
import {Card} from "@ui/card";
import {FileTrigger} from "@ui/file-trigger";
import {Loader} from "@ui/loader";
import {Note} from "@ui/note";
import {TextField} from "@ui/text-field";
import {Textarea} from "@ui/textarea";
import {useState} from "react";
import {Controller, useForm} from "react-hook-form";

export const Route = createFileRoute("/create-store")({
    loader: async () => {
        await protectRoute$()
        await checkStoreExists$()
    },
    component: CreateStore,
});

function CreateStore() {
    const [file, setFile] = useState<File | null>(null);
    const createStore = useServerFn(createStore$);
    const [uploadError, setUploadError] = useState<string | null>(null);

    const fileUrl = file ? URL.createObjectURL(file) : null;
    const {startUpload} = useUploadThing("storeLogo", {
        onUploadError: (error) => {
            setUploadError(error.message);
        },
    });

    const {
        control,
        handleSubmit,
        formState: {errors},
        watch,
        setError,
    } = useForm<CreateStoreFormData>({
        resolver: zodResolver(createStoreSchema),
        defaultValues: {
            name: "",
            description: "",
        },
    });

    const {mutate, isPending} = useMutation({
        mutationKey: ["create-store"],
        mutationFn: async (data: CreateStoreFormData) => {
            // 	Validate the files exist
            let logoUrl: string | undefined;
            if (file) {
                const res = await startUpload([file]);

                if (!res || !res[0]) {
                    return;
                }

                logoUrl = res[0].url;
            }

            await createStore({
                name: data.name,
                description: data.description,
                logo: logoUrl,
            });
        },

        onError: (error) => {
            setError("root", {
                message: error.message,
            });
        },
    });

    const storeName = watch("name");

    const onSubmit = (data: CreateStoreFormData) => {
        mutate(data);
    };

    return (
        <div className="container mx-auto p-4 max-w-2xl">
            <Card className="w-full">
                <Card.Header>
                    <Card.Title>Create Your Store</Card.Title>
                    <Card.Description className="text-sm text-muted-fg leading-tight">
                        Enter the essential details to set up your online store.
                    </Card.Description>
                </Card.Header>
                <Card.Content>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {uploadError && <Note intent={"danger"}>{uploadError}</Note>}
                        {errors.root && (
                            <Note intent={"danger"}>{errors.root.message}</Note>
                        )}
                        <div className="space-y-5">
                            <Controller
                                control={control}
                                name="name"
                                render={({field}) => (
                                    <TextField
                                        label="Store Name"
                                        placeholder="Enter your store name"
                                        {...field}
                                        isInvalid={!!errors.name}
                                        errorMessage={errors.name?.message}
                                    />
                                )}
                            />
                            <Controller
                                control={control}
                                name="description"
                                render={({field}) => (
                                    <Textarea
                                        label="Store Description"
                                        placeholder="Enter your store description"
                                        {...field}
                                        className="min-h-[100px]"
                                        isInvalid={!!errors.description}
                                        errorMessage={errors.description?.message}
                                    />
                                )}
                            />
                            <div>
                                <div className="flex items-center gap-2">
                                    <Avatar
                                        src={fileUrl}
                                        initials={storeName[0]}
                                        alt="Store Logo"
                                        size="large"
                                        className="object-cover overflow-hidden"
                                    />
                                    <FileTrigger
                                        onSelect={(e) => {
                                            const files = Array.from(e ?? []);
                                            setFile(files.length > 0 ? files[0] : null);
                                        }}
                                        size="extra-small"
                                        acceptedFileTypes={["image/png", "image/jpeg"]}
                                        allowsMultiple={false}
                                    >
                                        Upload Store Logo
                                    </FileTrigger>
                                </div>
                                <p className="text-xs text-muted-fg mt-2">
                                    This is optional (if not provided the initials of the store
                                    will be used)
                                </p>
                            </div>
                        </div>
                        <Button
                            type="submit"
                            size={"small"}
                            className="mt-6 w-full"
                            isPending={isPending}
                        >
                            {({isPending}) => (
                                <>{isPending ? <Loader variant="ring"/> : "Create Store"}</>
                            )}
                        </Button>
                    </form>
                </Card.Content>
            </Card>
        </div>
    );
}
