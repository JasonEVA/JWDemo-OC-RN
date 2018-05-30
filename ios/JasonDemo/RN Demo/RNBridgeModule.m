//
//  RNBridgeModule.m
//  JasonDemo
//
//  Created by 王喆 on 2018/5/30.
//  Copyright © 2018年 jasonwang. All rights reserved.
//

#import "RNBridgeModule.h"

@implementation RNBridgeModule

RCT_EXPORT_MODULE();

//一个参数
RCT_EXPORT_METHOD(JWDismissVC:(NSString *)msg)
{
    UIViewController *VC = UIApplication.sharedApplication.keyWindow.rootViewController;
    [VC dismissViewControllerAnimated:YES completion:nil];
}

//RCT_EXPORT_METHOD( cratCat:(NSString *)name sex:(NSString *)sex age:(int)age)
//{
//    NSLog(@"我创建了一只名叫%@的猫，性别%@， 今年%d岁", name, sex, age);
//}
//
////对外提供调用方法
//RCT_EXPORT_METHOD(addEvent:(NSString *)name location:(NSString *)location){
//    NSLog(@"Pretending to create an event %@ at %@", name, location);
//}
//
////方法3
//RCT_EXPORT_METHOD(whoName:(NSString *)name age:(int)age location:(NSString *)location){
//    NSLog(@"可以的%@,年来%d,还有%@",name,age,location);
//}
//
////回调
////RCTResponseSenderBlock
////RCTResponseSenderBlock只接受一个参数,为数组，把需要回调的参数加入到数组中，回调回去
//RCT_EXPORT_METHOD(calliOSActionWithCallBack:(RCTResponseSenderBlock)callBlock){
//    NSString *string=@"hello";
//
//    NSArray *array=@[@"RN",@"and",@"iOS"];
//
//    NSString *end=@"goodbay";
//
//    //更多参数放到数组中进行回调
//    callBlock(@[string,array,end]);
//}

@end
