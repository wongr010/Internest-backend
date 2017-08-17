//
//  TDTableViewCell.h
//  ToDo
//
//  Created by Nicholas Gerard on 1/5/16.
//  Copyright © 2016 Microsoft. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "TDItem.h"

@protocol TDTableViewCellDelegate <NSObject>

// The cell's delegate is notified when the to do item has been deleted
- (void) toDoItemDeleted:(TDItem*) todoItem;

// The cell's delegate is notified when the to do item has been completed
- (void) toDoItemCompleted:(TDItem*) todoItem;

@end


@interface TDTableViewCell : UITableViewCell

@property (nonatomic) TDItem *todoItem;
@property (nonatomic, assign) id<TDTableViewCellDelegate> delegate;

@end
