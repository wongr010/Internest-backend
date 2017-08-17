//
//  TDLabel.m
//  ToDo
//
//  Created by Nicholas Gerard on 1/5/16.
//  Copyright © 2016 Microsoft. All rights reserved.
//

#import "TDLabel.h"

@implementation TDLabel {
    bool _strikethrough;
    CALayer *_strikethroughLayer;
}

const float STRIKEOUT_THICKNESS = 2.0f;

- (id)initWithFrame:(CGRect)frame
{
    if ([super initWithFrame:frame]) {
        _strikethroughLayer = [CALayer layer];
        _strikethroughLayer.backgroundColor = [self.textColor CGColor];
        _strikethroughLayer.hidden = YES;
        [self.layer addSublayer:_strikethroughLayer];
    }
    return self;
}

- (void)layoutSubviews
{
    [super layoutSubviews];
    [self resizeStrikeThrough];
}

- (void)setText:(NSString *)text
{
    [super setText:text];
    [self resizeStrikeThrough];
}

- (void)setTextColor:(UIColor *)textColor
{
    [super setTextColor:textColor];
    _strikethroughLayer.backgroundColor = [textColor CGColor];
}

- (void)resizeStrikeThrough
{
    CGSize textSize = [self.text sizeWithAttributes:@{NSFontAttributeName: self.font}];
    _strikethroughLayer.frame = CGRectMake(0, self.bounds.size.height/2.0 - STRIKEOUT_THICKNESS/2.0,
                                           textSize.width, STRIKEOUT_THICKNESS);
}

- (void)setStrikethrough:(bool)strikethrough
{
    _strikethrough = strikethrough;
    _strikethroughLayer.hidden = !strikethrough;
}

@end
