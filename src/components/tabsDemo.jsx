import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { useEffect, useRef, useState } from 'react';

export function TabsDemo() {
    const [isVisible, setIsVisible] = useState(false);
    const elementRef = useRef(null);
    useEffect(() => {

        const observer = new IntersectionObserver(
            ([entry]) => {
                // 這裡可以監聽進入螢幕時的狀態
                setIsVisible(entry.isIntersecting);
            },
            {
                root: null, // 使用 viewport 來做為容器
                rootMargin: '0px', // 預設沒有額外的間距
                threshold: 0.5, // 當元素至少有 50% 顯示時觸發
            }
        );

        if (elementRef.current) {

            observer.observe(elementRef.current); // 開始觀察元素
        }

        // 清除 observer
        return () => {
            if (elementRef.current) {
                observer.unobserve(elementRef.current);
            }
        };
    }, []);

    return (
        <div
            ref={elementRef}
            className={`flex justify-center transition-opacity duration-500 ${isVisible ? "opacity-100" : "opacity-0"
                }`}
        >
            <Tabs
                defaultValue="band"
                className="w-[80vw] items-center mb-4 lg:mb-20 target-element"
            >
                <TabsList className="grid w-[100%] grid-cols-2 bg-[var(--secondary)] p-1 mb-4">
                    <TabsTrigger value="band" className="data-[state=active]:bg-[var(--warning)] data-[state=active]:text-[var(--secondary)] text-[var(--tertiary)] font-bold border-none">
                        BAND
                    </TabsTrigger>
                    <TabsTrigger value="app" className="data-[state=active]:bg-[var(--warning)] data-[state=active]:text-[var(--secondary)] text-[var(--tertiary)] font-bold border-none">
                        APP
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="band" className="w-[70%] mt-8">
                    <div className="flex flex-col justify-between lg:flex-row pl-8 pr-8 gap-20">
                        <div
                            className="w-2/3 lg:w-full self-center ml-4 p-16 rounded-lg bg-[var(--base-200)] flex items-center justify-center"
                        >
                            <img
                                src="/Watch.png"
                                alt="Watch"
                            />
                        </div>
                        <div className="flex flex-col text-start p-4">
                            <h1 className="text-3xl pb-8 text-[var(--accent)]">Smart tracking, precise recording—every set counts!</h1>
                            <p className="text-xl max-w-lg text-md text-[var(--secondary)]">
                                Take your strength training to the next level with our smart band.
                                Designed for weightlifters and fitness enthusiasts, this cutting-edge
                                wearable accurately detects and records your reps using advanced motion
                                sensors.
                            </p>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="app" className="w-[70%] mt-8 ">
                    <div className="flex flex-col items-center justify-between lg:flex-row-reverse pl-8 pr-8 gap-20">
                        <img
                            src="/APPUI.png"
                            alt="App UI"
                            className="lg:w-1/3 sm:w-2/3 h-[360px] object-contain "
                        />
                        <div className="flex flex-col text-start p-4">
                            <h1 className="text-3xl pb-8 text-[var(--accent)]">Grow Your Muscle Baby, Track Every Workout!</h1>
                            <p className="text-xl max-w-lg text-md text-[var(--secondary)]">
                                Track your workouts and watch your muscle baby grow with every rep.
                                Get personalized workout plans and AI-driven insights to boost your
                                progress and achieve your fitness goals.
                            </p>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>

    );
}
