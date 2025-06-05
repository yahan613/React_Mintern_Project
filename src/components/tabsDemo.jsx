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
                className="w-full max-w-[1200px] items-center mb-4 lg:mb-20 target-element px-4 md:px-6 lg:px-8"
            >
                <TabsList className="grid w-3/5 grid-cols-2 bg-[var(--secondary)] p-1 mb-2">
                    <TabsTrigger value="band" className="data-[state=active]:bg-[var(--warning)] data-[state=active]:text-[var(--secondary)] text-[var(--tertiary)] font-semibold border-none">
                        Band
                    </TabsTrigger>
                    <TabsTrigger value="app" className="data-[state=active]:bg-[var(--warning)] data-[state=active]:text-[var(--secondary)] text-[var(--tertiary)] font-semibold border-none">
                        App
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="band" className="w-full">
                    <div className="flex flex-col justify-between lg:flex-row">
                        <div
                            className="w-3/5 lg:w-full self-center py-8 md:p-12 lg:p-8 flex items-center justify-center"
                        >
                            <img
                                src="/Watch.png"
                                alt="Watch"
                                className="w-full h-auto object-contain max-w-[300px]"
                            />
                        </div>
                        <div className="flex flex-col p-4 sm:w-full text-center sm:justify-center">
                            <h1 className="text-2xl font-semibold md:text-3xl pb-4 md:pb-8 text-[var(--accent)] text-center lg:text-left">Smart tracking, precise recording—every set counts!</h1>
                            <p className="text-sm md:text-xl text-[var(--secondary)] break-normal whitespace-normal leading-relaxed lg:text-left">
                                使用我們的智慧手環，讓重量訓練更上層樓。
                                專為舉重與健身愛好者打造，透過先進的動作感測技術，準確偵測並記錄每一次訓練次數，幫助你更有效掌握運動成果。
                            </p>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="app" className="w-full mt-4">
                    <div className="flex flex-col items-center justify-between lg:flex-row-reverse">
                        <img
                            src="/APPUI.png"
                            alt="App UI"
                            className="w-full lg:w-2/5 max-h-[300px] object-contain lg:pr-20"
                        />
                        <div className="flex flex-col p-4 w-full lg:w-3/5 sm:justify-center">
                            <h1 className="text-2xl font-semibold md:text-3xl pb-4 md:pb-8 text-[var(--accent)] text-center lg:text-right">Grow Your Muscle Baby, Track Every Workout!</h1>
                            <p className="text-sm md:text-xl text-[var(--secondary)] break-normal whitespace-normal leading-relaxed text-center lg:text-right">
                            追蹤你的每一次訓練，看著你的「肌胸肉寶寶」隨著每下動作成長。
                            搭配專屬的訓練計畫與 AI 智能分析，全面提升訓練成效，助你達成理想體態!
                            </p>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>

    );
}
