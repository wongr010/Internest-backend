//
//  TDTableViewController.m
//  ToDo
//
//  Created by Nicholas Gerard on 1/5/16.
//  Copyright © 2016 Microsoft. All rights reserved.
//

#import "TDTableViewController.h"

#define INPUT_SECTION 0
#define TODO_SECTION 1
#define COMPLETE_SECTION 2

@implementation TDTableViewController {
    NSMutableArray *_toDoItems;
    NSMutableArray *_completedItems;
}

static NSString *kCellIdentifier = @"Cell";
static NSString *kInputCellIdentifier = @"InputCell";

- (void)viewDidLoad
{
    [super viewDidLoad];
    
    _toDoItems = [[NSMutableArray alloc] init];
    _completedItems = [[NSMutableArray alloc] init];
    
    self.tableView.separatorStyle = UITableViewCellSeparatorStyleNone;
    
    [self.tableView registerClass:[TDTableViewCell class]
           forCellReuseIdentifier:kCellIdentifier];
    [self.tableView registerClass:[TDInputTableViewCell class]
           forCellReuseIdentifier:kInputCellIdentifier];
}

#pragma mark - Table view data source

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView
{
    return 3;
}

- (NSInteger)tableView:(UITableView *)tableView
 numberOfRowsInSection:(NSInteger)section
{
    switch (section) {
        case INPUT_SECTION:
            return 1; // Add new item section
            break;
            
        case TODO_SECTION:
            return _toDoItems.count; // Pending items section
            break;
            
        case COMPLETE_SECTION:
            return _completedItems.count; // Completed items section
            break;
            
        default:
            return 0;
            break;
    }
}

- (UITableViewCell *)tableView:(UITableView *)tableView
         cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
    // Input cell
    if(indexPath.section==INPUT_SECTION) {
        TDInputTableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:kInputCellIdentifier
                                                                forIndexPath:indexPath];
        cell.delegate = self;
        return cell;
    }
    
    // To do cells
    else {
        TDTableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:kCellIdentifier
                                                                forIndexPath:indexPath];
        TDItem *item = (indexPath.section==TODO_SECTION) ? _toDoItems[[indexPath row]] : _completedItems[[indexPath row]];
        cell.delegate = self;
        cell.todoItem = item;
        
        return cell;
    }
}

- (CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath
{
    if(indexPath.section == INPUT_SECTION) {
        return 80.0f;
    }
    
    return 60.0f;
}

#pragma mark - Scroll view delegate

- (void)scrollViewDidScroll:(UIScrollView *)scrollView
{
    [self.view endEditing:YES]; // Dismiss keyboard when table view scrolls
}

#pragma mark - TDTableViewCell delegate methods

- (void)toDoItemDeleted:(id)todoItem
{
	NSUInteger index = [_toDoItems indexOfObject:todoItem];
    [self.tableView beginUpdates];
    [_toDoItems removeObject:todoItem];
    [self.tableView deleteRowsAtIndexPaths:@[[NSIndexPath indexPathForRow:index inSection:TODO_SECTION]]
                          withRowAnimation:UITableViewRowAnimationFade];
    [self.tableView endUpdates];
}

- (void)toDoItemCompleted:(id)todoItem
{
	NSUInteger index = [_toDoItems indexOfObject:todoItem];
    [self.tableView beginUpdates];
    [_toDoItems removeObject:todoItem];
    [_completedItems insertObject:todoItem atIndex:0];
	[self.tableView deleteRowsAtIndexPaths:@[[NSIndexPath indexPathForRow:index inSection:TODO_SECTION]]
                          withRowAnimation:UITableViewRowAnimationLeft];
	[self.tableView insertRowsAtIndexPaths:@[[NSIndexPath indexPathForRow:0 inSection:COMPLETE_SECTION]]
                          withRowAnimation:UITableViewRowAnimationLeft];
    [self.tableView endUpdates];
}

#pragma mark - TDInputTableViewCell delegate methods

- (void)toDoItemAdded:(TDItem*) todoItem
{
    [self.tableView beginUpdates];
    [_toDoItems insertObject:todoItem atIndex:0];
    [self.tableView insertRowsAtIndexPaths:@[[NSIndexPath indexPathForRow:0 inSection:TODO_SECTION]]
                          withRowAnimation:UITableViewRowAnimationTop];
    [self.tableView endUpdates];
}

#pragma mark - Utility

- (IBAction)clearAllTodos:(id)sender
{
    [_toDoItems removeAllObjects];
    [_completedItems removeAllObjects];
    [self.tableView reloadData];
}

@end
